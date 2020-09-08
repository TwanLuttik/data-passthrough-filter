export interface ISchema {
  [key: string]: {
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
    nullable?: boolean;
    length?: {
      min?: number;
      max?: number;
    };
  };
}

export interface IOptions {
  strict?: boolean;
}

// export interface IErrorResults {

// }