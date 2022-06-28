module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'object-curly-spacing': 'off',
    indent: 'off',
    'max-lines': 'off',
    'max-len': 'off',
    'no-tabs': 'off',
    'no-multiple-empty-lines': 'off',
    semi: 'off',
    'comma-spacing': 'warn',
    quotes: 'off',
    'no-unused-expressions': 'off',
    eqeqeq: 'off',
    'no-multi-spaces': 'off',
    'space-before-blocks': 'off',
    'unicode-bom': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'padded-blocks': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'key-spacing': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'padded-blocks': 'off',
    'no-useless-constructor': 'off',
    "camelcase": 'off',
    "vue/no-mutating-props": 'error',
    "generator-star-spacing": 'off',
    "eol-last": 'off',
    "lines-between-class-members": 'off',
    "vue/no-unused-components": 'warn',
    "symbol-description": 'warn',
    "no-undef": 'off',  //否则vue文件的ts感知.d.ts声明有影响
    "one-var": 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': 'off',
    "@typescript-eslint/no-unused-vars": 'off',
    "@typescript-eslint/ban-ts-comment": 'off',
    "@typescript-eslint/no-explicit-any": 'off',
    "@typescript-eslint/no-namespace": 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
