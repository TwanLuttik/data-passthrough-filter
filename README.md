# data-passthrough-filter

<i>**Note:** This package is not in the release state</i>

<br>

_If you have any question, You can contact me at:_
<br>

**Twitter**: [@TwanLuttik](https://twitter.com/TwanLuttik) \
**Discord**: Twan#0001

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

## Error

The main function will throw an error as an array with objects

<br>

```typescript
// example, Password has to be longer than 7

try {
  // data you want to validate
  const data = { password: '2020' };

  // schema
  const schema: ISchema = {
    password: {
      length: {
        min: 7,
      },
    },
  };

  // validate and return if valid
  return validate(data, schema);
} catch (e) {
  [
    {
      key: 'password',
      value: '2020',
      desc: 'The minimun required length is 7',
    },
  ];
}
```
