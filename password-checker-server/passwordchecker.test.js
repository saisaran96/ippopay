const passwordchecker = require('./passwordchecker');

describe('passwordchecker', () => {
	test('return 2', () => {
		expect(passwordchecker('testing')).toBe(2);
	});

	test('return 1', () => {
		expect(passwordchecker('testing1')).toBe(1);
	});

	test('return 0', () => {
		expect(passwordchecker('Testing1')).toBe(0);
	});

	test('return 2', () => {
		expect(passwordchecker('aaaaaa')).toBe(2);
	});
});
