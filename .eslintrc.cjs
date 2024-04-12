module.exports = {
  root: true,
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'vue',
  ],
  globals: {
    //
  },
  rules: {
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowTypedFunctionExpressions: true },
    ],
    // The core 'no-unused-vars' rules (in the eslint:recommended ruleset) does not work with type
    // definitions
    'no-unused-vars': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // allow console during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Project rules
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-constant-binary-expression': 'error',
    'no-duplicate-imports': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable-loop': 'error',
    'arrow-body-style': 'off',
    'complexity': ['error', 15],
    'consistent-return': 'error',
    'default-case': 'error',
    eqeqeq: 'error',
    'no-alert': 'error',
    'no-confusing-arrow': 'error',
    'no-else-return': 'error',
    'no-implicit-coercion': 'error',
    'no-mixed-operators': 'error',
    'no-nested-ternary': 'error',
    'no-return-assign': 'error',
    '@typescript-eslint/no-shadow': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'sort-imports': ['error', {
      'ignoreCase': true,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'single', 'multiple'],
      'allowSeparatedGroups': false
    }],

    // Vue rules
    'vue/block-tag-newline': 'error',
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/define-emits-declaration': 'error',
    'vue/define-macros-order': 'error',
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/no-empty-component-block': 'error',
    'vue/no-required-prop-with-default': 'error',
    'vue/no-root-v-if': 'error',
    'vue/no-static-inline-styles': 'error',
    'vue/no-unused-refs': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-define-options': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/require-emit-validator': 'error',
    'vue/require-macro-variable-name': 'error',
    'vue/require-typed-ref': 'error',
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/valid-define-options': 'error',
    'vue/attributes-order': ['error', { 'alphabetical': true }],
  },
};
