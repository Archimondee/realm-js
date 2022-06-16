////////////////////////////////////////////////////////////////////////////
//
// Copyright 2022 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import { expect } from "chai";

import { Realm } from "../index";
import { Results } from "../Results";
import { CanonicalObjectSchema } from "../schema-types";

type RealmContext = Mocha.Context & { realm: Realm };

type Person = { name: string };
type PersonWithFriend = { name: string; bestFriend: Person };
type PersonWithFriends = { name: string; bestFriend: Person; friends: Person[] };

function generateRandomInteger() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

describe("Milestone #2", () => {
  describe("Opening default local Realm", () => {
    it("can read schema from disk", () => {
      const realm = new Realm();
      const schema = realm.schema;
      const expectedSchema: CanonicalObjectSchema[] = [
        {
          name: "Person",
          properties: { name: { name: "name", type: "string", optional: false, indexed: false, mapTo: "name" } },
        },
      ];
      expect(schema).deep.equals(expectedSchema);
    });
  });

  describe("Reading an object by primary key", () => {
    before(function (this: RealmContext) {
      this.realm = new Realm();
    });

    it("returns an instance of Realm.Object", function (this: RealmContext) {
      const alice = this.realm.objectForPrimaryKey("Person", "Alice");
      expect(alice).instanceOf(Realm);
    });
  });

  describe("Reading a “string” property from an object", () => {
    before(function (this: RealmContext) {
      this.realm = new Realm();
    });

    it("returns the correct string", function (this: RealmContext) {
      const alice = this.realm.objectForPrimaryKey<Person>("Person", "Alice");
      expect(alice.name).equals("Alice");
    });
  });

  describe("Follow an object “link” from an object to another", () => {
    before(function (this: RealmContext) {
      this.realm = new Realm();
    });

    it("returns the correct object", function (this: RealmContext) {
      const alice = this.realm.objectForPrimaryKey<PersonWithFriend>("Person", "Alice");
      expect(alice.bestFriend.name).equals("Bob");
    });
  });

  describe("Writing a “string” property to an existing object", () => {
    before(function (this: RealmContext) {
      this.realm = new Realm();
    });

    it("persists the value", function (this: RealmContext) {
      const charlie = this.realm.objectForPrimaryKey<Person>("Person", "Charlie");
      charlie.name = "Charles";
      expect(charlie.name).equals("Charles");
      charlie.name = "Charlie";
      expect(charlie.name).equals("Charlie");
    });
  });

  describe("Writing a “link” property to an existing object", () => {
    before(function (this: RealmContext) {
      this.realm = new Realm();
    });

    it("persists the value", function (this: RealmContext) {
      const alice = this.realm.objectForPrimaryKey<PersonWithFriend>("Person", "Alice");
      const charlie = this.realm.objectForPrimaryKey<PersonWithFriend>("Person", "Charlie");
      charlie.bestFriend = null;
      expect(charlie.bestFriend).equals(null);
      alice.bestFriend = charlie;
      expect(alice.bestFriend.name).equals("Charlie");
    });
  });

  describe("Create a new object, specifying property values", () => {
    before(function (this: RealmContext) {
      this.realm = new Realm();
    });

    it("persists the object and its value", function (this: RealmContext) {
      const name = "Darwin #" + generateRandomInteger();
      const person = this.realm.write(() => {
        return this.realm.create<Person>("Person", { name });
      });
      expect(person.name).equals(name);
    });
  });

  describe("Declaring a schema #1", () => {
    it("supports properties of type 'string'", function (this: RealmContext) {
      const path = "random-" + generateRandomInteger() + ".realm";
      this.realm = new Realm({ path, schema: [{ name: "Person", properties: { name: "string" } }] });
      const person = this.realm.write(() => {
        return this.realm.create("Person", { name: "Alice" });
      });
      expect(person.name).equals("Alice");
    });

    it("supports properties of type 'link'", function (this: RealmContext) {
      const path = "random-" + generateRandomInteger() + ".realm";
      this.realm = new Realm({
        path,
        schema: [{ name: "Person", properties: { name: "string", bestFriend: "Person" } }],
      });
      const { alice, bob } = this.realm.write(() => {
        const alice = this.realm.create<PersonWithFriend>("Person", { name: "Alice", bestFriend: null });
        const bob = this.realm.create<PersonWithFriend>("Person", { name: "Bob", bestFriend: alice });
        return { alice, bob };
      });
      expect(alice.name).equals("Alice");
      expect(bob.name).equals("Bob");
      expect(bob.bestFriend.name).equals("Alice");
    });

    it("supports properties of type 'list<link>'", function (this: RealmContext) {
      const path = "random-" + generateRandomInteger() + ".realm";
      this.realm = new Realm({
        path,
        schema: [{ name: "Person", properties: { name: "string", bestFriend: "Person", friends: "Person[]" } }],
      });
      const { alice, bob } = this.realm.write(() => {
        const alice = this.realm.create<PersonWithFriends>("Person", { name: "Alice", bestFriend: null, friends: [] });
        const bob = this.realm.create<PersonWithFriends>("Person", {
          name: "Bob",
          bestFriend: alice,
          friends: [alice],
        });
        return { alice, bob };
      });
      expect(alice.name).equals("Alice");
      expect(bob.name).equals("Bob");
      expect(bob.bestFriend.name).equals("Alice");
      expect(bob.friends[0].name).equals("Alice");
    });
  });

  describe("Querying database for objects of a specific type", () => {
    before(function (this: RealmContext) {
      this.realm = new Realm();
    });

    it("return Results", function (this: RealmContext) {
      const persons = this.realm.objects("Person");
      expect(persons).instanceOf(Results);
      expect(persons.length).greaterThan(0);
      const alice = persons.find((p) => p.name === "Alice");
      expect(alice).instanceOf(Realm.Object);
    });
  });
});
