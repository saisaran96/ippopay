module.exports = function (password) {
	let missing = 3;

	if (/[a-z]/.test(password)) {
		missing--;
	}
	if (/[A-Z]/.test(password)) {
		missing--;
	}
	if (/\d/.test(password)) {
		missing--;
	}

	let insert = 0;
	let deleteCount = 0;
	if (password.length < 6) {
		insert = 6 - password.length;
	} else if (password.length > 20) {
		deleteCount = password.length - 20;
	}

	let replace = 0;
	let i = 2;
	// Checking for repeating in first 20 characters
	// beacuse password of lengh more then 20 will be deleted
	while (i < Math.min(password.length, 20)) {
		if (
			password[i] === password[i - 1] &&
			password[i - 1] === password[i - 2]
		) {
			let j = i;
			while (
				password[j] === password[i - 1] &&
				j < Math.min(password.length, 20)
			) {
				j++;
			}
			let length = j - i;
			replace += Math.ceil(length / 3);
			i = j;
		} else {
			i++;
		}
	}

	let final = deleteCount + Math.max(missing, replace + insert);

	return final;
};
