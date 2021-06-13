# Data Passthrough Filter 1.2.*

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

| Parameter | value                                                | Description                              |
| --------- | ---------------------------------------------------- | ---------------------------------------- |
| type      | `string`, `number`, `boolean`, `object`, `array`     | Set for a specific type                  |
| nullable  | `boolean`                                            | nullable applied (NaN included)          |
| length    | `{ min: number, max: number }` or array `[min, max]` | set a min and/or max length of the value |
| required  | `boolean`                                            | required the key                         |

<br>
<br>
<br>

## Options

Additional options for validating your data

| Parameter   | value     | default | Description                                                     |
| ----------- | --------- | ------- | --------------------------------------------------------------- |
| requiredAll | `boolean` | false   | the input requires every property from the schema               |
| overflow    | `boolean` | true    | Allowes to return data thats not have been listed in the schema |
| noThrow     | `boolean` | false    | Allows you to control how you want to throw the error           |

<br>
<br>
<br>

## Error handling

When you call `validate()` function, By default it will throw the error as an `string[]`, But you can change that with the option `{ noThrow: true }`, And it will return the error as `{ errors: string[] }`


<br>

*example: `{ errors: ["The maximun required length is 4", "value doesn't meet the schema"]`*

<br>
<br>
<br>

## About

<br>
<br>

_If you have any questions, You can contact me on:_
<br>

**Twitter**: [@TwanLuttik](https://twitter.com/TwanLuttik) \
