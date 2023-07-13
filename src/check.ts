import { SchemaBase } from './types';

export class Check {
  private options: SchemaBase = {};

  constructor() {}

  public type(v: 'string' | 'number' | 'boolean' | 'object' | 'array') {
    this.options.type = v;
    return this;
  }

  public string() {
    this.options.type = 'string';
    return this;
  }

  public number() {
    this.options.type = 'number';
    return this;
  }

  public boolean() {
    this.options.type = 'boolean';
    return this;
  }

  public object() {
    this.options.type = 'object';
    return this;
  }

  public array() {
    this.options.type = 'array';
    return this;
  }

  public required(v?: boolean) {
    this.options.required = v === undefined ? true : v;
    return this;
  }

  public nullable(v?: boolean) {
    this.options.nullable = v === undefined ? true : v;
    return this;
  }

  public length(v: { min?: number; max?: number } | [number, number]): this {
    this.options.length = v;
    return this;
  }
}
