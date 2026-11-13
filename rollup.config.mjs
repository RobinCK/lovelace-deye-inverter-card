import { readFileSync } from 'node:fs';

import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/deye-inverter-card.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: { __CARD_VERSION__: JSON.stringify(pkg.version) },
    }),
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.json', include: ['src/**/*.ts'] }),
    terser({ format: { comments: false } }),
  ],
};
