import { IOptions, ISchema } from './interfaces';
import { lengthCheck, requireAll, requiredCheck, returnHandler, ReturnHandlerType, sanatizeData } from './lib';

/**
 * @param {object} data Your input data as an object with k/v
 * @param {object} schema Rules for validating the data
 * @param {boolean} options.strict It requires all the keys from the schema,
 * But it doesn't add extra data that is not listed in the schema
 */

export const validate = <T extends object, V extends ISchema, O extends IOptions>(data: T, schema?: V, options?: IOptions): ReturnHandlerType<V, O> => {
  let input = [];
  let errors: string[] = [];

  // Check if we have input data
  if (!Object.keys(data).length) {
    errors.push('Input data is empty');
    return returnHandler(options, errors, data);
  }

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

    // check if value is not null
    if (rule?.nullable === false && value === null) {
      errors.push(`[${key}] type cannot be null`);
      continue;
    }

    // check if the type is correct
    if (rule?.type && rule?.type !== typeof value) {
      errors.push(`[${key}] type is not a [${rule?.type}], Received a [${typeof value}]`);
      continue;
    }

    // Check for the length if its too short or too long
    if (rule?.length) errors = errors.concat(lengthCheck(key, value, rule));
  }

  // Return the data
  return returnHandler(options, errors, data);
};
