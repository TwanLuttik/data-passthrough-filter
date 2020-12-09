import { validate } from '../';

(function () {
  try {
    const data = {
      email: null,
      password: 'dsadsa'
    };

    const val = validate(
			data,
			{
				email: {
					type: 'string',
				},
				password: {
					type: 'string',
					length: { max: 70 },
				},
			},
			{ requireAll: true }
		);
    
    console.log({...val});
    
  } catch (e) {
    console.log('- ERROR', e);
  }
})();
