import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsStylePlugin from '@stylistic/eslint-plugin-ts';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import solidPlugin from 'eslint-plugin-solid';

export default [
  // Base config for non-TypeScript files
  {
    ignores: [
      'node_modules/**/*',
      '**/*.min.[tj]s',
      'build/**/*',
      'dist/**/*',
      'coverage/**/*',
    ],
  },
  // JavaScript files config
  {
    files: ['**/*.js', '**/*.mjs'],
    ...js.configs.recommended,
  },
  // TypeScript files config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic/ts': tsStylePlugin,
      'import': importPlugin,
      'unused-imports': unusedImports,
      'solid': solidPlugin,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // Extend recommended TypeScript rules
      ...tsPlugin.configs['recommended'].rules,
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
      ...solidPlugin.configs.recommended.rules,

      // General best practices
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-unused-private-class-members': 'error',
      'no-use-before-define': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      
      // Unused imports and variables
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      
      // Import rules
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
            ['type'],
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
        },
      ],
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-relative-packages': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-self-import': 'error',

      // TypeScript rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
      }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' }
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': ['error', {
        checksVoidReturn: false,
      }],
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['classMethod', 'typeLike'],
          format: ['PascalCase'],
        },
        {
          selector: 'variableLike',
          format: ['camelCase', 'UPPER_CASE'],
          filter: {
            regex: '^[A-Z]',
            match: false,
          },
        },
        {
          selector: 'variableLike',
          format: ['PascalCase'],
          filter: {
            regex: '^[A-Z]',
            match: true,
          },
        },
        {
          selector: 'property',
          format: ['camelCase'],
        }
      ],

      // Stylistic rules
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/semi': ['error', 'always'],
      '@stylistic/ts/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      }],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/ts/space-before-function-paren': ['error', 'never'],
      '@stylistic/ts/space-infix-ops': 'error',
      '@stylistic/ts/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        }
      ],
    },
  },
]; 
