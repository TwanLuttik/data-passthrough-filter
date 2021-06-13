import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: { file: './dist/index.js', format: 'cjs' },
  plugins: [
    typescript({ outDir: './test' }),
    cleanup({
      comments: 'none',
      extensions: ['js', 'ts'],
    }),
    terser(),
  ],
};
