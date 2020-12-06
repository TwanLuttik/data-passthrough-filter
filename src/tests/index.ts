import { validate } from '../';

(function () {
  try {
    const data = {
      email: 2,
      password: 44
    };

    const val = validate(
      data,
      {
        email: { type: 'number' },
        password: { type: 'number', required: false },
        data: { type: 'number', required: true },
      },
      { noThrow: false }
    );
    
    console.log({...val});
    
  } catch (e) {
    console.log('- ERROR', e);
  }
})();
