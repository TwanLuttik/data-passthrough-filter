import { validate } from '../';

(function () {
  try {
    const data = {
      id: 1,
      email: 'twan@test.com',
      password: 'twan',
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
    
    console.log(val);
  } catch (e) {
    console.log('ERROR', e);
  }
})();
