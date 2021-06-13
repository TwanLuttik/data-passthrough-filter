import { SchemaBase, ISchema } from './interfaces';

export class Check {
  private options: SchemaBase;

  constructor() {
    this.options = {};
  }

  public type(v: 'string' | 'number' | 'boolean' | 'object' | 'array') {
    this.options.type = v;
    return this;
  }

  public required(v: boolean) {
    this.options.required = v;
    return this;
  }

  public nullable(v: boolean) {
    this.options.nullable = v;
    return this;
  }

  public length(v: { min?: number; max?: number } | [number, number]): this {
    this.options.length = v;
    return this;
  }
}

export let check = () => new Check();

// const b = {
//   x1: check().type('number').length({ max: 50 }),
//   x2: check().type('string').required(false).length([4, 5]),
// };

// console.log(b.x1);
