import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'


const isProduction = !process.env.ROLLUP_WATCH

const plugins = [
  commonjs({
    namedExports: {
      'react': ['isValidElement', 'Children', 'cloneElement', 'useRef', 'useEffect', 'useState','memo',
      'Fragment', 'createElement', 'forwardRef', 'createRef', 'useMemo', 'createContext', 'findDOMNode',
      'useCallback', 'useImperativeHandle', 'useContext', 'useLayoutEffect', 'Component', 'useDebugValue', 'useReducer'],
      'react-dom': ['findDOMNode', 'createPortal', 'render', 'unmountComponentAtNode'],
      'prop-types': ['elementType'],
      'react-js': ['isValidElementType', 'isValidElement', 'isFragment'],
      'react-is': ['ForwardRef', 'Memo', 'isFragment', 'isValidElementType'],
      'react-router-dom': ['BrowserRouter', 'Switch', 'Route', 'useHistory', 'Link'],
      'react/jsx-runtime': ['jsx', 'jsxs'],
      'react-speech-recognition': ['useSpeechRecognition'],
      'pg': ['Pool']
    }
  }),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: 'dist',
  }),
  babel({ 
    exclude: 'node_modules/**',
    presets: ['@babel/preset-react', '@babel/env'],
    plugins: ['@babel/plugin-transform-runtime'],
    babelHelpers: 'runtime'
  }),
  postcss({
    extensions: [ '.css', 'scss' ]
  }),
  copy({
    targets: [
      { src: 'index.html', dest: '../../dist/client' },
      { src: 'images/*', dest: '../../dist/client/images' },
      { src: 'extensions/*', dest: '../../dist/client/extensions' },
      { src: 'resources/*', dest: '../../dist/client/resources' }
    ]
  }),
  json(),
  nodeResolve(),
  replace({
    'process.env.NODE_ENV': isProduction ? '"production"' : '"development"',
    preventAssignment: true
  })
]

module.exports = {
  plugins,
  input: './index.tsx',
  output: {
    file: `../../dist/client/index.js`,
    format: 'cjs',
    name: 'Template',
    sourcemap: true,
    intro: 'const global = window;'
  },
}