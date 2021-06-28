import { check, validate } from './index';

const test = () => {
  try {
    const d = {
      test: false,
      email: 'twan@email.com',
    };

    const schem = {
      password: check().string(),
      email: check().string(),
    };

    // schem.email

    const val = validate(d, schem, { requireAll: false, overflow: false });

    // val.

    console.log(val);
  } catch (error) {
    console.log('error', error);
  }
};

test();
