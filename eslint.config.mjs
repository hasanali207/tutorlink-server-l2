import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules', 'dist'],
    rules: {
      // 'no-unused-vars': 'error', // Disallow unused variables
      // 'no-unused-expressions': 'error', // Disallow unused expressions
      'prefer-const': 'error', // Enforce `const` for variables that are not reassigned
      'no-console': 'warn', // Warn for console statements
      'no-undef': 'error', // Disallow the use of undeclared variables
    },
  },
];
