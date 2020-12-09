import { validate } from '../';

(function () {
  try {
    const data = {
      email: undefined
    };

    const val = validate(
      data,
      {
        email: { type: 'number' },
      },
      { noThrow: true }
    );
    
    console.log({...val});
    
  } catch (e) {
    console.log('- ERROR', e);
  }
})();
