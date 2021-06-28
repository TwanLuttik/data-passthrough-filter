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
    return returnHandler<T>(errors, data);
  }

  // require all check
  if (options?.requireAll) errors = errors.concat(requireAll(data, schema));

  // check for required
  errors = errors.concat(requiredCheck(data, schema));

  // sanatize the data if we disallow overflow
  inputData = options?.overflow === false ? Object.entries(sanatizeData(data, schema)) : Object.entries(data);

  // iterate over the data we pass trough
  for (let item of inputData) {
    // Varialbes
    const key = item[0];
    const value = item[1];

    // Skip if there is no schema for the key
    if (!schema[key]) continue;
    
    const rules = schema[key]['options'];

    // Skip if key is not present and not required
    if (!rules.required || !options.requireAll) continue;

    // check if the key is present in the schema
    if (rules === undefined || Object.getOwnPropertyNames(rules).length === 0) continue;

    // check if value is not null
    if (rules?.nullable === false && value === null) {
      errors.push({ key, reason: 'cannot be null' });
      continue;
    }

    // Check if type is correct with the schema
    if (rules.type === typeof value) continue;
    // Else push error
    else if (rules.type !== typeof value) {
      errors.push({ key, reason: 'type should be ' + rules.type });
      continue;
    }

    // Check for the length if its too short or too long
    if (rules?.length) errors = errors.concat(lengthCheck(key, value, rules));
  }

  // Return the data
  return returnHandler(errors, Object.fromEntries(inputData));
};
