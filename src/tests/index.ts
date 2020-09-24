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
        id: {},
        email: {},
        password: {},
      },
      {
        requireAll: true,
        overflow: false
      }
    );

    if (val.error) console.log('ERROR', val.error)
    else console.log(val.data);
    
  } catch (e) {
    console.log('ERROR', e);
  }
})();
