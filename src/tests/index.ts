import { validate } from '../';

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
        price: { type: 'string' },
        lazy: {}
			},
			{ overflow: false }
		);
		
		if (val.errors) console.log('test');
		
    console.log('values', {...val});
    
  } catch (e) {
    console.log('- ERROR', e);
  }
})();
