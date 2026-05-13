// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: [
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      '.cache/**',
      'test-results/**',
      'playwright-report/**',
      'playwright/.cache/**'
    ],
    rules: {
      // Общие правила
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // Vue правила
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'warn',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style']
      }],

      // TypeScript правила
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-dynamic-delete': 'off'
    }
  }
)
