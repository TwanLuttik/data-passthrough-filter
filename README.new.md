## data-passtrhough-filter 2.0.0 - WORK IN PROGRESS

<br>

Basic usage

```typescript
import { validate, check } from 'data-passthroug-filter';

const data = {
  email: 'twan@email.com',
  password: 123,
};

const options = {
  email: check().string().required(),
  password: check().number().required(),
};

const val = validate(data, options);
```

<br>
<br>

## Error handling

When it the validation doesn't pass, it will throw an erorr in the following schematic

```typescript
[ { key: email: reason: 'password is missing' }]
```

**Twitter**: [@TwanLuttik](https://twitter.com/TwanLuttik)
