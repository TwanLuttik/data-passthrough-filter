import { validate } from '../';

(function () {
  try {
    const data = {
      email: 2,
    };

    const val = validate(
      data,
      {
        email: { type: 'number' },
        password: { type: 'number', required: false },
        data: { type: 'number' },
      }
    );

    console.log(val.email);
  } catch (e) {
    console.log('- ERROR', e);
  }
})();
