import { Check } from "check";

export interface ISchema {
  [index: string]: SchemaBase | Check;
}

export interface SchemaBase {
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  nullable?: boolean;
  required?: boolean;
  length?:
    | {
        min?: number;
        max?: number;
      }
    | [number, number];
}

export interface IOptions {
  requireAll?: boolean;
  overflow?: boolean;
}

export interface ErrorType {
  key: string;
  reason: string;
}
[];
