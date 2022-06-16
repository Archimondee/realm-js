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

import { ObjectSchema as BindingObjectSchema, Property as BindingProperty, PropertyType } from "@realm/bindgen";
import { expect } from "chai";
import { inspect } from "util";

import { CanonicalObjectSchema, CanonicalObjectSchemaProperty } from "../Object";
import { transformPropertySchema, transformObjectSchema } from "../schema-utils";

describe("schema-utils", () => {
  describe("transformPropertySchema", () => {
    const TESTS: [BindingProperty, CanonicalObjectSchemaProperty][] = [
      [
        { name: "prop", type: PropertyType.Int, columnKey: { value: 0 } },
        { name: "prop", type: "int", optional: false, mapTo: "prop", indexed: false },
      ],
      [
        { name: "prop", type: PropertyType.Int | PropertyType.Nullable, columnKey: { value: 0 } },
        { name: "prop", type: "int", optional: true, mapTo: "prop", indexed: false },
      ],
      [
        { name: "prop", type: PropertyType.String, columnKey: { value: 0 } },
        { name: "prop", type: "string", optional: false, mapTo: "prop", indexed: false },
      ],
      [
        { name: "prop", type: PropertyType.String | PropertyType.Nullable, columnKey: { value: 0 } },
        { name: "prop", type: "string", optional: true, mapTo: "prop", indexed: false },
      ],
    ];
    for (const [input, expectedSchema] of TESTS) {
      it("transforms " + inspect(input, { compact: true, breakLength: Number.MAX_SAFE_INTEGER }), () => {
        const schema = transformPropertySchema(input);
        expect(schema).deep.equals(expectedSchema);
      });
    }
  });

  describe("transformObjectSchema", () => {
    const TESTS: [BindingObjectSchema, CanonicalObjectSchema][] = [
      [
        {
          name: "Person",
          persistedProperties: [
            { name: "name", type: PropertyType.String, columnKey: { value: 0 } },
            {
              name: "friends",
              type: PropertyType.Object ^ PropertyType.Array,
              objectType: "Person",
              columnKey: { value: 1 },
            },
          ],
        },
        {
          name: "Person",
          properties: {
            name: { name: "name", type: "string", optional: false, mapTo: "name", indexed: false },
            friends: {
              name: "friends",
              type: "list",
              optional: false,
              mapTo: "friends",
              objectType: "Person",
              indexed: false,
            },
          },
        },
      ],
    ];
    for (const [input, expectedSchema] of TESTS) {
      it("transforms " + inspect(input, { compact: true, breakLength: Number.MAX_SAFE_INTEGER }), () => {
        const schema = transformObjectSchema(input);
        expect(schema).deep.equals(expectedSchema);
      });
    }
  });
});
