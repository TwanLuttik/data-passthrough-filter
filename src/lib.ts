import { ErrorType, ISchema, SchemaBase } from './interfaces';

export const lengthCheck = (key: any, value: any, rule: any): ErrorType[] => {
  let errors = [];

  // filter for blacklisted properties
  if (typeof value === 'object') return;

  // min length check
  const MIN = Array.isArray(rule.length) ? rule.length[0] : rule.length.min;
  if (value?.length < MIN) {
    errors.push({ key, reason: `minimun length ${MIN} required` });
  }

  // max length check
  const MAX = Array.isArray(rule.length) ? rule.length[1] : rule.length.max;
  if (value?.length > MAX) {
    errors.push({ key, reason: `minimun length ${MAX} required` });
  }
  return errors;
};

export const requireAll = (data: any, schema: ISchema): ErrorType[] => {
  const schemaEntries = Object.entries(schema);
  let errors = [];

  // Loop trough the schema
  for (let item of schemaEntries) {
    const key = item[0];

    // if key is not present
    if (data[key] === undefined) errors.push({ key, reason: key + ' is missing' });
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
export const requiredCheck = <T>(data: T, schema: ISchema): ErrorType[] => {
  const entries = Object.entries(schema);
  let errors = [];

  for (let entry of entries) {
    if (!!entry[1]['options'].required && data[entry[0]] === undefined) errors.push({ key: entry[0], reason: `${entry[0]} is required` });
  }

  return errors;
};

// Return type handler
export type ReturnHandlerType<S extends ISchema> = { [K in keyof S]: any };

/**
 * @descrption This handlers how we return data or throw errors
 */
export const returnHandler = <S extends ISchema>(errors: ErrorType[], data: any): ReturnHandlerType<S> => {
  // return the data if we have no validation errors
  if (!errors.length) return cleanObject(data);
  // throw the errors
  else throw errors;
};

/**
 * @description Delete all the keys that are undefined
 */
export const cleanObject = <T>(o: T): T => {
  for (let i of Object.entries(o)) {
    if (i[1] === undefined) delete o[i[0]];
  }
  return o;
};
