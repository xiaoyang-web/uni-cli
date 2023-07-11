module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  globals: {
    uni: true,
    UniApp: true,
    getCurrentPages: true
  },
  ignorePatterns: [
    '/dist',
    '/public',
    '/src/public',
    '/src/static',
    '/node_modules',
    '**/*-min.js',
    '**/*.min.js',
    '**/*-min.css',
    '**/*.min.css',
    '**/*.config.js',
    '**/*.config.ts',
    '**/*.d.ts',
    '/src/manifest.json'
  ]
};
