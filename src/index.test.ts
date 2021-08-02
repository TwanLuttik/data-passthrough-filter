import { check, validate } from './index';

const test = () => {
  try {
    const d = [
      {
        list: 10,
        list2: [1, 2, 4],
      },
      { id: 7584549032 },
    ];

    const schem = {
      list: check().number().length({ min: 5, max: 10 }),
      XX: check().required(),
    };

    const val = validate(d, schem);

    if (!val) console.log('Object is empty');
    else console.log(val);
  } catch (error) {
    console.log('error', error);
  }
};

test();
