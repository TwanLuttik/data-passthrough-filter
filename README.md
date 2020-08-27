# data-passthrough-filter

<br>
<br>

## Example
<br>

```typescript
import validator, { ISchema } from 'data-passthrough-filter'

const input = {
  id: 1,
  email: 'example@email.com',
  admin: true
}

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
}

const res = validator(input, scheme);
```
<br>
<br>

## Usage

```typescript
validator(input, shema);
```
<br>

input is the data you pass in.
Schema is the way how you control how the data get passtrough by adding checks or types and etc.


