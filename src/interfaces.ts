import { Check } from './check';

export interface ISchema {
  [index: string]: Check;
}

export interface SchemaBase {
  type?: Type;
  nullable?: boolean;
  required?: boolean;
  length?: Length;
}

export type Type = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'symbol' | 'function' | 'bigint' | 'undefined';

export type Length = lengthObject | lengthArray;

type lengthObject = {
  min?: number;
  max?: number;
};

type lengthArray = [number, number];

export interface IOptions {
  requireAll?: boolean;
  overflow?: boolean;
}

export interface ErrorType {
  key: string;
  reason: string;
}
[];
