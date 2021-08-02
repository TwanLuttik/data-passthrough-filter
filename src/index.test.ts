import { check, validate } from './index';

const test = () => {
  try {
    const d = {
      id: 4321423524,
      title: 'dsadsa'
    };

    const schem = {
      id: check().number().required(),
    }

    const val = validate(d, schem);

    if (!val) console.log('Object is empty');
    else console.log(val);
  } catch (error) {
    console.log('error', error);
  }
};

test();
