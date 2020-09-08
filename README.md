# data-passthrough-filter

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
  roles: ['admin', 'helpers']
};

const schema: ISchema = {
  id: {
    type: 'number',
    nullable: false
  },
  email: {
    type: 'string',
    nullable: true
  },
  password: {
    type: 'string',
    length: {
      min: 7,
      max: 80
    }
  },
  admin: null
};

const res = validator(input, scheme, { strict: true });
```

<br>
<br>

## Usage
- When you pass the data it returns the 

```typescript
validator(input, shema, options);
```

<br>

## Input

You pass in an object with keys.

<br>
<br>

## Schema

Schema is an object with keys as

| Parameter | value | Description |
| ----- | ------ | ------ |
| type | `string`, `number`, `boolean`, `object`, `array`, | Set for a specific type |
| nullable | `boolean` | nullable applied |
| length | `{ min: number, max: number } ` | And object with an min and max value|

<br>
<br>
<br>

## Options
Additional options for validating your data

| Parameter | value     | Description                                      |
| --------- | --------- | ------------------------------------------------ |
| strict    | `boolean` | Checks strictly if input matches with the schema |
