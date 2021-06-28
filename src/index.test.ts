import { check, validate } from './index';

const test = () => {
  try {
    const d = { location: 'Canada', other: false };

    const schem = {
      location: check().string(),
      username: check().string(),
    };

    // schem.email

    const val = validate(d, schem, { overflow: false });

    // val.

    console.log(val);
  } catch (error) {
    console.log('error', error);
  }
};

test();
