import { check, validate } from './index';

const test = () => {
  try {
    const d = {
      email: 'twan@email.com',
    };

    const schem = {
      email: check().string().required(),
      password: check().string().nullable(false),
    };

    // schem.email

    const val = validate(d, schem);

    // val.password;

    console.log(val);
  } catch (error) {
    console.log('error', error);
  }
};

test();
