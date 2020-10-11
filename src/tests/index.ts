import { validate } from '../';

(function () {
  try {
    const data = {
      id: 1,
      email: 'twan@test.com',
      password: 'test',
      admin: false
    };

    const val = validate(
      data,
      {
        id: {
          type: 'number'
        },
        email: {},
        password: {},
        admin: {}
      },
      {}
    );

    if (val.error) console.log('ERROR', val.error)
    else console.log(val);
    
  } catch (e) {
    console.log('ERROR', e);
  }
})();
