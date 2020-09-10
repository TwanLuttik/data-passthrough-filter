import { validate } from '../';


(function() {
  try {

    const data = {
      id: 1,
      email: 'twan@test.com',
      password: 'sssst',
      admin: {}
    }

    const val = validate(data, {
      id: {
        type: 'number'
      },
      email: {
        type: 'string'
      },
      password: {
        length: { min: 3, max: 5 }
      }
    });

    console.log(val);
    
  } catch (e) {
    console.log('ERROR', e);
  }
}())