import { check, validate } from './index';

const test = () => {
  try {
    const d = {
      list: 10,
    };

    const schem = {
      list: check().number().length({ min: 5, max: 10 })
    };

    const val = validate(d, schem, { overflow: false });

    if (!val) console.log('Object is empty');
    else console.log(val);
  } catch (error) {
    console.log('error', error);
  }
};

test();
