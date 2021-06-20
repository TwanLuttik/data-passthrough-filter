export interface ISchema {
  [key: string]: SchemaBase;
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
  noThrow?: boolean;
}

export interface ErrorType {
  key: string;
  reason: string;
}
[];
