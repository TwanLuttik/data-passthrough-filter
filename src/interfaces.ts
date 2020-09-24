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
  requireAll?: boolean;
  overflow?: boolean;
}

export interface IErrorResults {
  value?: string;
  key?: any;
  desc?: string;
}

export interface IResults {
  [index: string]: any;
  error?: IErrorResults[];
}