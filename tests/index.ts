import { validate } from '../src/index';

const test = () => {
  try {
    const d = {
      audio_id: '4321423524',
      message: 'this is an test for another test',
      time_stamp: 423432,
    };

    const val = validate([d], (e) => ({
      audio_id: e().number().required(false),
      test: e().string().nullable(),
      another: e().string().required(false),
    }));

    console.log(val);
  } catch (error) {
    console.log('error', error);
  }
};

test();
