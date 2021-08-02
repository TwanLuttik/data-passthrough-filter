# Data Passthrough Filter 2.1.0


## Basic usage

```typescript
import { validate, check } from 'data-passthroug-filter';

// Incoming data (data can be object or array of objects)
const data = {
  email: 'twan@email.com',
  password: 123,
};

// Schema for validating the data
const schema = {
  email: check().string().required(),
  password: check().number().required(),
};

// Global options
const options = { overflow: false }

// instance returns the validated data
const val = validate(data, schema, options);
```

<br>
<br>

## Schema

The schema is done by chaining functions with starting of with the `check()` function and passing the value as parameter

<br>

| Parameter    | value                                                | default | Description                              |
| ------------ | ---------------------------------------------------- | ------- | ---------------------------------------- |
| `type()`     | `string`, `number`, `boolean`, `object`, `array`     | `none`  | Set for a specific type                  |
| `nullable()` | `boolean`                                            | `true`  | nullable applied (NaN included)          |
| `length()`   | `{ min: number, max: number }` or array `[min, max]` | `none`  | set a min and/or max length of the value |
| `required()` | `boolean`                                            | `true`  | require key                              |

<br>
<br>

## Options

Additional options for validating your data

| Parameter   | value     | default | Description                             |
| ----------- | --------- | ------- | --------------------------------------- |
| requiredAll | `boolean` | false   | All the schema keys are required        |
| overflow    | `boolean` | true    | Only returns data that is in the schema |

<br>
<br>

## Errors

It will throw errors when it fails to validate _(Pretty straight forward)_

<br>

_example: `[ { key: 'password', reason: 'password is required'}]`_

<br>
<br>

## About

_If you have any questions, You can contact me on:_
<br>

**Twitter**: [@TwanLuttik](https://twitter.com/TwanLuttik)
