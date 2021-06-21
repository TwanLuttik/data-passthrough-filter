import { ErrorType, IOptions, ISchema } from './interfaces';
import { lengthCheck, requireAll, requiredCheck, returnHandler, ReturnHandlerType, sanatizeData } from './lib';

/**
 * @param {object} data Your input data as an object with k/v
 * @param {object} schema Rules for validating the data
 * @param {boolean} options.strict It requires all the keys from the schema,
 * But it doesn't add extra data that is not listed in the schema
 */

export const validate = <T extends ISchema, S extends IOptions>(data: any, schema?: T, options?: S): ReturnHandlerType<T> => {
  let inputData = [];
  let errors: ErrorType[] = [];

  // Check if we have input data
  if (!data || !Object.keys(data).length) {
    errors.push({ key: 'none', reason: 'input data is empty' });
    return returnHandler(errors, data);
  }

  // require all check
  if (options?.requireAll) errors = errors.concat(requireAll(data, schema));

  // check for required
  errors = errors.concat(requiredCheck(data, schema));

  // sanatize the data if we disallow overflow
  inputData = options?.overflow === false ? Object.entries(sanatizeData(data, schema)) : Object.entries(data);

  // iterate over the data we pass trough
  for (let item of inputData) {
    // variables
    const key = item[0];
    const value = item[1];

    // skip if there is no schema configuration
    if (!schema[key]) continue;

    // Get the rules of the key
    const rule = schema[key];

    // check if the key is present in the schema
    if (rule === undefined || Object.getOwnPropertyNames(rule).length === 0) continue;

    // check if value is not null
    if (rule?.nullable === false && value === null) {
      errors.push({ key, reason: 'cannot be null' });
      continue;
    }

    // Check if type is correct with the schema
    if (rule.type === typeof value) continue;
    // Else push error
    else if (rule.type !== typeof value) {
      errors.push({ key, reason: 'type should be ' + rule.type });
      continue;
    }

    // Check for the length if its too short or too long
    if (rule?.length) errors = errors.concat(lengthCheck(key, value, rule));
  }

  // Return the data
  return returnHandler(errors, Object.fromEntries(inputData));
};
