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

import { Results } from "./Results";

type PropertyType = string;
type SortDescriptor = unknown;
type CollectionChangeCallback<T> = unknown;

export class Collection<T> implements ReadonlyArray<T> {
  readonly [n: number]: T;
  length: number;

  readonly type: PropertyType;
  readonly optional: boolean;

  toString(): string {
    throw new Error("Method not implemented.");
  }
  toLocaleString(): string {
    throw new Error("Method not implemented.");
  }
  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];
  concat(...items: any[]): T[] {
    throw new Error("Method not implemented.");
  }
  join(separator?: string): string {
    throw new Error("Method not implemented.");
  }
  slice(start?: number, end?: number): T[] {
    throw new Error("Method not implemented.");
  }
  indexOf(searchElement: T, fromIndex?: number): number {
    throw new Error("Method not implemented.");
  }
  lastIndexOf(searchElement: T, fromIndex?: number): number {
    throw new Error("Method not implemented.");
  }
  every<S extends T>(
    predicate: (value: T, index: number, array: readonly T[]) => value is S,
    thisArg?: any,
  ): this is readonly S[];
  every(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): boolean;
  every(predicate: any, thisArg?: any): boolean {
    throw new Error("Method not implemented.");
  }
  some(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): boolean {
    throw new Error("Method not implemented.");
  }
  forEach(callbackfn: (value: T, index: number, array: readonly T[]) => void, thisArg?: any): void {
    throw new Error("Method not implemented.");
  }
  map<U>(callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any): U[] {
    throw new Error("Method not implemented.");
  }
  filter<S extends T>(predicate: (value: T, index: number, array: readonly T[]) => value is S, thisArg?: any): S[];
  filter(predicate: (value: T, index: number, array: readonly T[]) => unknown, thisArg?: any): T[];
  filter<S extends T>(predicate: any, thisArg?: any): T[] | S[] {
    throw new Error("Method not implemented.");
  }
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T;
  reduce(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T,
    initialValue: T,
  ): T;
  reduce<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U,
    initialValue: U,
  ): U;
  reduce<U>(callbackfn: any, initialValue?: any): T | U {
    throw new Error("Method not implemented.");
  }
  reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T): T;
  reduceRight(
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: readonly T[]) => T,
    initialValue: T,
  ): T;
  reduceRight<U>(
    callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: readonly T[]) => U,
    initialValue: U,
  ): U;
  reduceRight<U>(callbackfn: any, initialValue?: any): T | U {
    throw new Error("Method not implemented.");
  }
  find<S extends T>(
    predicate: (this: void, value: T, index: number, obj: readonly T[]) => value is S,
    thisArg?: any,
  ): S;
  find(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): T;
  find<S extends T>(predicate: any, thisArg?: any): T | S {
    throw new Error("Method not implemented.");
  }
  findIndex(predicate: (value: T, index: number, obj: readonly T[]) => unknown, thisArg?: any): number {
    throw new Error("Method not implemented.");
  }
  entries(): IterableIterator<[number, T]> {
    throw new Error("Method not implemented.");
  }
  keys(): IterableIterator<number> {
    throw new Error("Method not implemented.");
  }
  values(): IterableIterator<T> {
    throw new Error("Method not implemented.");
  }
  includes(searchElement: T, fromIndex?: number): boolean {
    throw new Error("Method not implemented.");
  }
  flatMap<U, This = undefined>(
    callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[],
    thisArg?: This,
  ): U[] {
    throw new Error("Method not implemented.");
  }
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[] {
    throw new Error("Method not implemented.");
  }
  [Symbol.iterator](): IterableIterator<T> {
    throw new Error("Method not implemented.");
  }

  // Other methods

  /**
   * @returns An object for JSON serialization.
   */
  toJSON(): Array<unknown> {
    throw new Error("Method not implemented.");
  }

  description(): string {
    throw new Error("Method not implemented.");
  }

  isValid(): boolean {
    throw new Error("Method not implemented.");
  }

  isEmpty(): boolean {
    throw new Error("Method not implemented.");
  }

  min(property?: string): number | Date | null {
    throw new Error("Method not implemented.");
  }
  max(property?: string): number | Date | null {
    throw new Error("Method not implemented.");
  }
  sum(property?: string): number | null {
    throw new Error("Method not implemented.");
  }
  avg(property?: string): number {
    throw new Error("Method not implemented.");
  }

  /**
   * @param  {string} query
   * @param  {any[]} ...arg
   * @returns Results
   */
  filtered(query: string, ...arg: any[]): Results<T> {
    throw new Error("Method not implemented.");
  }

  sorted(reverse?: boolean): Results<T>;
  sorted(descriptor: SortDescriptor[]): Results<T>;
  sorted(descriptor: string, reverse?: boolean): Results<T>;
  sorted(arg0?: boolean | string | SortDescriptor, arg1?: boolean): Results<T> {
    throw new Error("Method not implemented.");
  }

  /**
   * @returns Results
   */
  snapshot(): Results<T> {
    throw new Error("Method not implemented.");
  }

  /**
   * @param  {(collection:any,changes:any)=>void} callback
   * @returns void
   */
  addListener(callback: CollectionChangeCallback<T>): void {
    throw new Error("Method not implemented.");
  }

  /**
   * @returns void
   */
  removeAllListeners(): void {
    throw new Error("Method not implemented.");
  }

  /**
   * @param  {()=>void} callback this is the callback to remove
   * @returns void
   */
  removeListener(callback: CollectionChangeCallback<T>): void {
    throw new Error("Method not implemented.");
  }
}
