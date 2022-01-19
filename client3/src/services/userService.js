export async function getUser(token) {
	try {
		const response = await fetch("/api/user", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();

		if (data.success) {
			return data.user;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err);
	}
}
