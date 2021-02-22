module.exports = {
	parser: "@typescript-eslint/parser",

	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",

		ecmaFeatures: {
			jsx: true,
		},
	},

	settings: {
		react: {
			version: "detect",
		},
		polyfills: ["fetch"],
	},

	env: {
		browser: true,
	},

	extends: [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:compat/recommended", // Lints browser compatibility
		"plugin:react-hooks/recommended",
		"plugin:unicorn/recommended",
		"plugin:security/recommended",
		"plugin:styled-components-a11y/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:prettier/recommended", // THIS ALWAYS HAS TO BE THE LAST EXTENDS! Activates Prettier specified rules
	],

	plugins: [
		"simple-import-sort",
		"better-styled-components",
		"deprecate",
		"unicorn",
		"security",
		"styled-components-a11y",
		"jsx-a11y",
	],

	rules: {
		"simple-import-sort/imports": [
			"error",
			{
				groups: [["^@?\\w"], ["^[^.]"], ["^\\."], ["^\\u0000"]],
			},
		],
		"better-styled-components/sort-declarations-alphabetically": 2,
		"no-restricted-imports": [
			"error",
			{
				paths: [
					{
						name: "styled-components",
						message: "Please import from styled-components/macro.",
					},
				],

				patterns: ["!styled-components/macro"],
			},
		],
		"unicorn/no-array-reduce": 0,
		"unicorn/no-useless-undefined": 0,
		"unicorn/no-for-loop": 0,
		"unicorn/filename-case": 0,
		"unicorn/consistent-function-scoping": 0,
		"security/detect-non-literal-fs-filename": 0,
		"security/detect-unsafe-regex": 0,
		"unicorn/no-null": 0,
		"unicorn/no-array-for-each": 0, //TODO: @el1f actually likes this rule. Refactor all forEach statements into .maps etc
		"unicorn/no-new-array": 0, //HACK: this conflicts with unicorn/new-for-builtins
		"unicorn/no-abusive-eslint-disable": 0, //TODO: FIND A BETTER WAY. PLEASE.
		"unicorn/prevent-abbreviations": [
			"error",
			{
				whitelist: {
					env: true,
					props: true,
					ref: true,
				},
			},
		],
		"security/detect-object-injection": 0,
		"compat/compat": 0,
	},
};
