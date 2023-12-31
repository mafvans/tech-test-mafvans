module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    '*.spec.ts',
    '*-spec.ts',
    '**/types.ts',
    '**/constants.ts',
    '**/enums.ts',
  ],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'function',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/class-name-casing': 'warn',
    'prefer-object-spread': 'error',
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'require-await': 'warn',
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': ['error'],
    'arrow-body-style': ['warn', 'as-needed'],
    'max-params': ['warn', 2],
    'max-lines': ['warn', 300], // Should calculate this value
    complexity: ['warn', 5], // Should calculate this value 15
    '@typescript-eslint/camelcase': 'error',
    'import/no-default-export': 'error',
    'import/order': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/interface-name-prefix': 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    'object-shorthand': 'error',
    '@typescript-eslint/ban-ts-ignore': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/ban-types': 'error',
    'no-empty': 'error',
    'no-var': 'error',
    'no-undef': 'error',
    'no-case-declarations': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    'no-unsafe-finally': 'error',
    'no-self-assign': 'error',
    'no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': 2,
    curly: 2,
  },
};
