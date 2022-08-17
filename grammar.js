module.exports = grammar({
	name: "jsontm",
	extras: $ => [
		$._whitespace,
	],

	rules: {
		document: $ => $._value,

		_value: $ => choice(
			$.object,
			$.array,
			$.string
		),

		object: $ => seq(
			"{", commaSep($.pair), "}"
		),

		pair: $ => seq(
			field("key", choice($.string, $.number)),
			":",
			field("value", $._value)
		),

		array: $ => seq(
			"[", commaSep($._value), "]"
		),

		string: $ => choice(
			seq('"', '"'),
			seq('"', $.string_content, '"')
		),

		string_content: $ => repeat1(choice(
			token.immediate(prec(1, /[^\\"\n]+/)),
			$.escape_sequence
		)),

		escape_sequence: $ => token.immediate(seq(
			'\\',
			/(\"|\\|\/|b|f|n|r|t|u)/
		)),

	}
});

function commaSep1(rule) {
	return seq(rule, repeat(seq(",", rule)))
}

function commaSep(rule) {
	return optional(commaSep1(rule))
}