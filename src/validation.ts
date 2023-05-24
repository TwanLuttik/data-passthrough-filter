import { ErrorType, IOptions, ISchema, Type } from './interfaces';
import { flattenArrayObjectToObject, lengthCheck, requireAll, requiredCheck, returnHandler, ReturnHandlerType, sanatizeData, valueType } from './lib';

/**
 * @param {object} data Your input data as an object with k/v
 * @param {object} schema Rules for validating the data
 * @param {boolean} options.strict It requires all the keys from the schema,
 * But it doesn't add extra data that is not listed in the schema
 */

export const validate = <T extends ISchema, S extends IOptions>(data: object | object[], schema?: T, options?: S): ReturnHandlerType<T> => {
  let inputData = [];
  let errors: ErrorType[] = [];

  // Check if we have input data
  if (!data || !Object.keys(data).length) {
    // Check if there is required data needed
    errors = errors.concat(requiredCheck(data, schema));

    return returnHandler<T>(errors, data);
  }

  // If the data is a array, merge the data into 1 object
  if (Array.isArray(data)) data = flattenArrayObjectToObject(data);

  // require all check
  if (options?.requireAll) errors = errors.concat(requireAll(data, schema));

  // check for required
  errors = errors.concat(requiredCheck(data, schema));

  // sanatize the data if we disallow overflow
  inputData = Object.entries(options?.overflow === false ? sanatizeData(data, schema) : data);

  // iterate over the data we pass trough
  for (let item of inputData) {
    // Varialbes
    const key = item[0];
    const value: Type = item[1];

    // Skip if there is no schema for the key
    if (!schema[key]) continue;

    const rules = schema[key]['options'];

    // Skip if the schema is present but the key not
    if (rules && value === undefined) continue;

    // check if the key is present in the schema
    if (rules === undefined || Object.getOwnPropertyNames(rules).length === 0) continue;

    // check if value is not null
    if (rules?.nullable === false && value === null) {
      errors.push({ key, reason: 'cannot be null' });
      continue;
    }

    // Check for type
    if (rules?.type && valueType(value) !== rules.type) {
      errors.push({ key, reason: 'type should be ' + rules.type });
      continue;
    }

    // Check for the length if its too short or too long
    if (rules?.length) errors = errors.concat(lengthCheck(key, value, rules.length));
  }

  // Return the data
  return returnHandler(errors, Object.fromEntries(inputData));
};
