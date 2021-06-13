import { check, validate } from '../';

(function () {
  try {
    const data = {
      price: 'expensive',
      name: 'twan',
      lazy: false
    };

    const val = validate(
			data,
			{
        price: check().type('string')
			},
			{ overflow: false }
		);

		if (val.errors) console.log('test');
		
    console.log('success =>', val);
    
  } catch (e) {
    console.log('error =>', e);
  }
})();
