import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

/** @type {import('eslint').Linter.Config[]} */
export default withNuxt(
	{
		// Базовые настройки для всех файлов
		files: ['**/*.{js,mjs,cjs,ts,vue}'],
		ignores: [
			'**/.nuxt/**', // Игнорируем папку .nuxt
			'**/node_modules/**', // Игнорируем node_modules
			'**/dist/**', // Игнорируем папку сборки
			'**/output/**', // Игнорируем папку output
		],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
	// Рекомендуемые правила ESLint
	pluginJs.configs.recommended,
	// Рекомендуемые правила TypeScript
	...tseslint.configs.recommended,
	// Рекомендуемые правила Vue
	...pluginVue.configs['flat/essential'],
	// Настройки для Vue-файлов
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},
	// Интеграция с Prettier
	{
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'no-constant-condition': 'off',
			'no-useless-escape': 'off',
			'@typescript-eslint/no-unused-expressions': 'warn',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/triple-slash-reference': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'no-undef': 'off',
			'prettier/prettier': 'off', // Включаем Prettier как правило ESLint
			'vue/no-multiple-template-root': 'off',
			'vue/max-attributes-per-line': 'off', // Отключаем стандартное правило Vue
			'vue/first-attribute-linebreak': [
				'error',
				{
					singleline: 'ignore',
					multiline: 'below',
				},
			],
			'vue/html-closing-bracket-newline': [
				'error',
				{
					singleline: 'never', // Для одной строки не переносим
					multiline: 'always', // Для нескольких строк переносим закрывающий тег на новую строку
				},
			],
			'vue/multi-word-component-names': 'off',
		},
	},
	// Конфигурация Prettier
	prettierConfig,
)
