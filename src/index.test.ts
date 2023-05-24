import { check, validate } from './index';

const test = () => {
  try {
    const d = {
      id: 4321423524,
      title: 'dsadsa',
      pass: 'tdsadsa',
    };

    const schem = {
      id: check().number().required(),
      pass: check().string().required(),
    };

    const val = validate(d, schem);
    console.log(val);
  } catch (error) {
    console.log('error', error);
  }
};

test();
