export async function createList(token, title) {
	try {
		const response = await fetch("/api/list", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title }),
		});

		const data = await response.json();
		console.log(data);

		if (data.success) {
			return data;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err);
	}
}
