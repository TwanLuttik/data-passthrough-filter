import { ErrorType, ISchema, Type } from './interfaces';

export const lengthCheck = (key: any, value: any, rule: any): ErrorType[] => {
  let errors: ErrorType[] = [];
  const type = valueType(value);

  // filter for blacklisted properties
  if (type === 'object') return;

  // get the value size depending what type it is
  const valueSize = type === 'number' ? value : value.length;

  // Check for min size
  const minSizeRule = Array.isArray(rule) ? rule[0] : rule.min;
  if (minSizeRule !== null && valueSize < minSizeRule) {
    errors.push({ key, reason: `minimun length is ${minSizeRule}` });
    return errors;
  }

  // Check for max size
  const maxSizeRule = Array.isArray(rule) ? rule[1] : rule.max;
  if (maxSizeRule !== null && valueSize > maxSizeRule) {
    errors.push({ key, reason: `maximum length is ${maxSizeRule}` });
    return errors;
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
    if (!!entry[1]['options']?.required && data[entry[0]] === undefined) errors.push({ key: entry[0], reason: `${entry[0]} is required` });
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
export const cleanObject = <T extends object>(o: T): T => {
  // loop trough and delete undefined keys
  for (let i of Object.entries(o)) {
    if (i[1] === undefined) delete o[i[0]];
  }

  // if object is empty, return null
  if (Object.entries(o).length === 0) return null;

  return o;
};

export const valueType = <T extends Type>(value: T): Type => {
  if (Array.isArray(value)) return 'array';
  return typeof value;
};

/**
 * @description turns a array of objects into 1 object combined
 * @param data an array of ojects is required
 * @returns Object of all K/V
 */
export const flattenArrayObjectToObject = (data: object[]): Object => {
  let newDataMap = {};
  for (let item of data) {
    newDataMap = { ...newDataMap, ...item };
  }
  return newDataMap;
};
