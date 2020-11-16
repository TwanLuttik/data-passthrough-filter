import { validate } from '../';

(function () {
  try {
    const data = {
      email: '31233',
      password: '2233',
    };

    const val = validate(
      data,
      {
        email: { length: [2, 4] },
        password: { length: [2, 4], type: 'string' },
      },
      { noThrow: false }
    );

    if (val.error) console.log('ERROR', val.error);
    else console.log(val);
  } catch (e) {
    console.log('- ERROR', e);
  }
})();
