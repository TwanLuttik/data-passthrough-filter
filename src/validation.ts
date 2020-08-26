// Interface for the schema
export interface ISchema {
  [key: string]: {
    type?: 'string' | 'number' | 'boolean';
    nullable?: boolean;
  } | null;
}


/**
 * @param {object} data Your input data as an object with k/v
 * @param {object} schema Rules for validating the data
 * @param {boolean} options.strict It requires all the keys from the schema,
 * But it doesn't add extra data that is not listed in the schema
 */
export const validate = (data: object, schema?: ISchema, options?: { strict: boolean }) => {
  const dataEntries = Object.entries(data);


  // Check if the 
  if (options.strict)
    
    // Check if all the keys from the sehema is present from the input data 
    Object.entries(schema).filter((x) => {
      const schemaKey = x[0];
      if (data[schemaKey] === undefined) throw('Missing key/value ' + schemaKey);
    })

  
  

  // iterate over the data we pass trough
  for (let item of dataEntries) {

    // variables
    const key = item[0];
    const value = item[1];
    const props = schema[key];


    // only return the data if strict enabled
    if (options?.strict && props === undefined) delete data[key];
    
    // check if required
    if (props?.nullable === false && value === null) throw(`[${key}] cannot be null`)
    
    // check if type is set
    if (props?.type && typeof value !== props.type) throw(`[${key}] doesn't match with the type [${props.type}]`);
  }

  return data;
};