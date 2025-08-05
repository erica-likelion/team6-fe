import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import pluginRouter from '@tanstack/eslint-plugin-router';
import path from 'path';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier, // prettier eslint 호환성 플러그인
      importPlugin.flatConfigs.recommended, // import export 관련 플러그인
      reactPlugin.configs.flat.recommended, // react 관련 플러그인
      reactPlugin.configs.flat['jsx-runtime'], // React 17 +
      ...pluginRouter.configs['flat/recommended'], // tanstack/router 플러그인
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      unicorn: eslintPluginUnicorn, // 현대적인 문법 지원
      'unused-imports': unusedImports, // 미사용 import 제거
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve('./tsconfig.json'), // 절대 경로 설정 오류
        },
      },
    },
  }
);
