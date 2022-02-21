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
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': 'off',
    "@typescript-eslint/no-unused-vars": 'off',
    "camelcase": 'off',
    "vue/no-mutating-props": 'error',
    // "@typescript-eslint/no-explicit-any": 'off',
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
