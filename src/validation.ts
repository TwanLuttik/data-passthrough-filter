import { IErrorResults, IOptions, ISchema } from './interfaces';

/**
 * @param {object} data Your input data as an object with k/v
 * @param {object} schema Rules for validating the data
 * @param {boolean} options.strict It requires all the keys from the schema,
 * But it doesn't add extra data that is not listed in the schema
 */
export const validate = <T extends object>(data: T, schema?: ISchema, options?: IOptions): T | Array<any> => {
  const dataEntries = Object.entries(data);
  let errors: Array<IErrorResults> = [];

  // iterate over the data we pass trough
  for (let item of dataEntries) {
    // variables
    const key = item[0];
    const value = item[1];
    const rule = schema[key];

    // check if the key is present in the schema
    if (rule === undefined) continue;

    // check if the type is correct
    if (rule?.type && rule?.type !== typeof value) {
      // errors.push(`[${key}] doesn't match with the type [${schema_key.type}]`);
      errors.push({ key, value, desc: `value doesn't meet the schema` });
      continue;
    }

    if (!rule?.nullable && value === null) {
      errors.push({ key, value, desc: 'Value cannot be null' });
      continue;
    }

    // Check for the length if its too short or too long
    if (rule?.length) {
      if (value.length <= rule.length.min) {
        errors.push({ key, value, desc: `The minimun required length is ${rule.length.min}` });
        continue;
      } else if (value.length > rule.length?.max) {
        errors.push({ key, value, desc: `The maximun required length is ${rule.length.max}` });
        continue;
      }
    }
  }

  if (errors.length > 0) throw errors;
  else return data;
};
