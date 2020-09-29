import { errors } from './validation';
import { ISchema } from './index';

export const lengthCheck = (key: any, value: any, rule: any): any => {
  // filter for blacklisted properties 
  if (typeof value === 'object') return;
  
  if (value?.length < rule.length?.min) {
    errors.push({ key, value, desc: `The minimun required length is ${rule.length.min}` });
  } 
  if (value?.length > rule.length?.max) {
    errors.push({ key, value, desc: `The maximun required length is ${rule.length.max}` });
  }
}

export const requireAll = (data: object, schema: ISchema) => {
  const schemaEntries = Object.entries(schema);

  // Loop trough the schema
  for (let item of schemaEntries) {
    const key = item[0];

    // if key is not present
    if (data[key] === undefined) errors.push({ desc: `${key} is missing from the input data`})
  }
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
}