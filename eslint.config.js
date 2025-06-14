import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularEslintTemplate from '@angular-eslint/eslint-plugin-template';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...compat.extends([
    'plugin:@angular-eslint/recommended',
    'plugin:@angular-eslint/template/process-inline-templates',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict',
    'prettier',
  ]),  {
    files: ['*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@angular-eslint': angularEslint,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component'] }],
      '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@typescript-eslint/explicit-member-accessibility': ['error', {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit'
        }
      }],
      'max-len': ['warn', {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }]
    },
  },
  {
    files: ['*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      'max-len': 'off'
    }
  },
  {
    files: ['*.html'],
    plugins: {
      '@angular-eslint/template': angularEslintTemplate,
    },
    rules: {
      ...angularEslintTemplate.configs.recommended.rules,
    },
  },
];
