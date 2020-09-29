# data-passthrough-filter

This is a simple object based validator;



<br>
<br>

## Example

```typescript
import validator, { ISchema } from 'data-passthrough-filter';

const input = {
  id: 1,
  email: 'example@email.com',
  password: 'thebestpassword2019',
  admin: true,
  roles: ['admin', 'helpers'],
};

const schema: ISchema = {
  id: {
    type: 'number',
    nullable: false,
  },
  email: {
    type: 'string',
    nullable: true,
  },
  password: {
    type: 'string',
    length: {
      min: 7,
      max: 80,
    },
  },
  admin: null,
};

const res = validator(input, schema, { requireAll: true });
```

<br>
<br>

## Usage

```typescript
validator(input, schema, options);
```

**input**: Data you want to validate as an **object**. \
**schema**: The schema you want to validate your data.

<!-- **options**: coming -->

<br>

## Schema

Optional rules for validating your data

<br>

| Parameter | value                                        | Description                          |
| --------- | -------------------------------------------- | ------------------------------------ |
| type      | `string` `number` `boolean` `object` `array` | Set for a specific type              |
| nullable  | `boolean`                                    | nullable applied                     |
| length    | `{ min: number, max: number } `              | And object with an min and max value |

<br>
<br>
<br>

## Options

Additional options for validating your data

| Parameter   | value     | default | Description                                                     |
| ----------- | --------- | ------- | --------------------------------------------------------------- |
| requiredAll | `boolean` | false   | the input requires every property from the schema               |
| overflow    | `boolean` | true    | Allowes to return data thats not have been listed in the schema |

<br>
<br>
<br>

## Error handling

The `validate()` function will return an object with error as key.

<br>


```
{
  // succeed returns the data
  data: any;


  // When it errors
  error: object[]

}
```



<br>
<br>
<br>
<br>
<br>
<br>

## About

<br>
<br>

_If you have any question, You can contact me at:_
<br>

**Twitter**: [@TwanLuttik](https://twitter.com/TwanLuttik) \
**Discord**: Twan#0001