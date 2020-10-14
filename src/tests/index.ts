import { validate } from '../';

(function () {
  try {
    const data = {
      email: 'null',
      password: ''
    };

    const val = validate(data, { email: { type: 'string' }, password: { nullable: false, length: { max: 70 } } }, { requireAll: true });

    if (val.error) console.log('ERROR', val.error);
    else console.log(val);
  } catch (e) {
    console.log('ERROR', e);
  }
})();
