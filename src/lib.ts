import { IOptions } from './interfaces';
import { ISchema } from './index';

export const lengthCheck = (key: any, value: any, rule: any): string[] => {
  let errors = [];

  // filter for blacklisted properties
  if (typeof value === 'object') return;

  // min length check
  const MIN = Array.isArray(rule.length) ? rule.length[0] : rule.length.min;
  if (value?.length < MIN) {
    errors.push(`The minimun required length is ${MIN}`);
  }

  // max length check
  const MAX = Array.isArray(rule.length) ? rule.length[1] : rule.length.max;
  if (value?.length > MAX) {
    errors.push(`The maximun required length is ${MAX}`);
  }
  return errors;
};

export const requireAll = (data: any, schema: ISchema): string[] => {
  const schemaEntries = Object.entries(schema);
  let errors = [];

  // Loop trough the schema
  for (let item of schemaEntries) {
    const key = item[0];

    // if key is not present
    if (data[key] === undefined) errors.push(`${key} is missing from the input data`);
  }

  return errors;
};

export const sanatizeData = <T>(data: T, schema: ISchema): T => {
  const schemEntries = Object.entries(schema);
  let sanatizedResult = <T>{};

  // loop through the schema
  for (let item of schemEntries) {
    const schemaKey = item[0];

    // add the k/v to the new object
    sanatizedResult[schemaKey] = data[schemaKey];
  }

  // return the new object with the sanatized data
  return sanatizedResult;
};

/**
 * @description Check for required in the schema and check also if the K/V is present
 */
export const requiredCheck = <T>(data: T, schema: ISchema): string[] => {
  const entries = Object.entries(schema);
  let errors = [];

  for (let entry of entries) {
    if (entry[1]?.required && data[entry[0]] === undefined) errors.push(`[${entry[0]}] missing`);
  }

  return errors;
};


/**
 * @descrption This handlers how we return data or throw errors
 */
export type ReturnHandlerType<S extends ISchema, O extends IOptions> = O['noThrow'] extends true ? string[] : {[K in keyof S]: any };
export const returnHandler = <S extends ISchema, O extends IOptions>(options: IOptions, errors: string[], data: any): ReturnHandlerType<S, O> => {
  // check if we have any errors
  if (!errors.length) return data as any;

  // if we don't wanna trow an error, We return just an Array<string>
  if (options?.noThrow === true) return errors as any;
  
  // else throw the error
  else throw errors;
};