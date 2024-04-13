// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check


module.exports = grammar({
	name: "test",
	rules: {
		root: $ => /\w+/,
	}
});
