import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules'],
    rules: {
      'no-console': 'error', //warn on console usage
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
]
