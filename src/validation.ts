import { IOptions, IResults, ISchema } from './interfaces';
import { lengthCheck, requireAll, requiredCheck, sanatizeData } from './lib';

/**
 * @param {object} data Your input data as an object with k/v
 * @param {object} schema Rules for validating the data
 * @param {boolean} options.strict It requires all the keys from the schema,
 * But it doesn't add extra data that is not listed in the schema
 */
export const validate = <T extends object, V extends ISchema>(data: T, schema?: V, options?: IOptions): IResults | (IResults & T) => {
  let input = [];
  // let errors: IErrorResults[] = [];
  let errors: string[] = [];

  // require all check
  if (options?.requireAll) errors = errors.concat(requireAll(data, schema));

  // check for required
  errors = errors.concat(requiredCheck(data, schema));

  // sanatize the data if we disallow overflow
  input = options?.overflow === false ? Object.entries(sanatizeData(data, schema)) : Object.entries(data);

  // iterate over the data we pass trough
  for (let item of input) {
    // variables
    const key = item[0];
    const value = item[1];
    const rule = schema[key];

    // check if the key is present in the schema
    if (rule === undefined || Object.getOwnPropertyNames(rule).length === 0) continue;

    // check if the type is correct
    if (rule?.type && rule?.type !== typeof value) {
      errors.push(`value doesn't meet the schema`);
    }

    // Check for nullable
    if (rule?.nullable === false && value === null) {
      errors.push('Value cannot be null');
    }

    // Check for the length if its too short or too long
    if (rule?.length) errors = errors.concat(lengthCheck(key, value, rule));
  }

  // check if we have any errors
  if (errors.length > 0)
    // Check if we don't want to throw the error
    if (options?.noThrow) return errors;
      else throw errors;

    return data;
};
