import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const packageJson = require('./package.json')

export default [
  // Main build
  {
    input: 'src/main-index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ 
        browser: true,
        preferBuiltins: false 
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.ts', '**/*.test.tsx', 'examples/**/*']
      }),
    ],
    external: [
      'react',
      'react-dom',
      '@tiptap/core',
      '@tiptap/react',
      'lucide-react',
      'class-variance-authority',
      'clsx'
    ],
  },
  // Type definitions
  {
    input: 'dist/main-index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]