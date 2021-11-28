export async function signup(body) {
	const res = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	return res.json();
}

export async function login(email, password) {
	const res = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	return res.json();
}

export function comparePasswords(password, confirmPassword) {
	return password === confirmPassword;
}
