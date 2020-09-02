# data-passthrough-filter

<br>
<br>

# THIS PACKAGE IS STILL UNDER DEVELOPMENT

<br>
<br>
<br>

## Example

```typescript
import validator, { ISchema } from 'data-passthrough-filter';

const input = {
  id: 1,
  email: 'example@email.com',
  admin: true
};

const schema: ISchema {
  id: {
    type: 'number',
    nullable: false
  },
  email: {
    type: 'string',
    nullable: true
  },
  id: {
    type: 'number',
    nullable: true
  }
};

const res = validator(input, scheme);
```
<br>
<br>

## Usage

```typescript
validator(input, shema);
```
<br>
<br>

**input** is your data input as an object with key/values.
<br>

**Schema** is the way how you control how the data get passtrough by adding checks or types and etc.


