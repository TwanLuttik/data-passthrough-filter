import { IErrorResults, ISchema } from './index';

export const lengthCheck = (key: any, value: any, rule: any): any => {
  let errors = [];

  // filter for blacklisted properties
  if (typeof value === 'object') return;

  if (value?.length < rule.length?.min) {
    errors.push({ key, value, desc: `The minimun required length is ${rule.length.min}` });
  }
  if (value?.length > rule.length?.max) {
    errors.push({ key, value, desc: `The maximun required length is ${rule.length.max}` });
  }
  return errors
};

export const requireAll = (data: object, schema: ISchema) => {
  const schemaEntries = Object.entries(schema);
  let errors = []

  // Loop trough the schema
  for (let item of schemaEntries) {
    const key = item[0];

    // if key is not present
    if (data[key] === undefined) errors.push({ desc: `${key} is missing from the input data` });
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
export const requiredCheck = <T>(data: T, schema: ISchema): IErrorResults[] => {
  const entries = Object.entries(schema);
  let errors = []

  for (let entry of entries) {
    if (entry[1]?.required && data[entry[0]] === undefined) errors.push({ key: entry[0], desc: `${entry[0]} is not present` });
  }
  
  return errors;
};
