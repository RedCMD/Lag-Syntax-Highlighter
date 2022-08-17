module.exports = grammar({
	name: "jsontm",
	extras: $ => [
		$._whitespace,
	],

	rules: {
		source_file: $ => repeat1(
			$.object,
		),
		
		object: $ => seq(
			'{',
			seq(
				$.version,
				$.$schema,
				$.scopeName,
				$.name,
				$.patterns,
				$.repository,
			),
			'}',
		),
		
		_whitespace: $ => /[^\S\r\n]/,
	}
});