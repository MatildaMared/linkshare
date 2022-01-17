const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");
const List = require("../models/listModel");

describe("Lists API", () => {
	let token = "";
	let listId = "";

	beforeAll(async () => {
		await User.deleteMany({});
		await List.deleteMany({});

		// Create a new user
		const user = {
			firstName: "Matilda",
			email: "matildamared@live.se",
			password: "test1234",
		};

		await api.post("/api/users").send(user);

		const dummyList = {
			title: "Dummy List",
		};

		const credentials = {
			email: "matildamared@live.se",
			password: "test1234",
		};

		const loggedInUser = await api
			.post("/api/login")
			.send(credentials)
			.expect("Content-Type", /application\/json/);

		token = loggedInUser.body.token;

		const result = await api
			.post("/api/lists")
			.send(dummyList)
			.set("Authorization", `bearer ${token}`)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		listId = result.body.list._id;
	});

	beforeEach(async () => {
		jest.setTimeout(100000);

		const credentials = {
			email: "matildamared@live.se",
			password: "test1234",
		};

		const loggedInUser = await api
			.post("/api/login")
			.send(credentials)
			.expect("Content-Type", /application\/json/);

		token = loggedInUser.body.token;
	});

	describe("Fetching list data", () => {
		it("succeeds when provided a valid id", async () => {
			const response = await api
				.get(`/api/lists/${listId}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const listTitle = response.body.list.title;
			expect(listTitle).toBe("Dummy List");
		});

		it("fails with status code 400 if ID is invalid", async () => {
			const listId = "wrongId123";

			const response = await api
				.get(`/api/lists/${listId}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});
	});

	describe("Creating a new list", () => {
		let newList = {
			title: "My first list",
		};

		it("succeeds when provided all neccessary information", async () => {
			const response = await api
				.post("/api/lists")
				.send(newList)
				.set("Authorization", `bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			expect(response.body.list.title).toBe(newList.title);
		});

		it("fails with status code 400 if list title is missing", async () => {
			newList = {};

			const response = await api
				.post("/api/lists")
				.send(newList)
				.set("Authorization", `bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Please enter a list title");
		});

		it("fails with status code 400 when authentication token is missing", async () => {
			const response = await api
				.post("/api/lists")
				.send(newList)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 401 if authentication token is invalid", async () => {
			token = "thisisnotacorrectjwttoken";
			const response = await api
				.post("/api/lists")
				.send(newList)
				.set("Authorization", `bearer ${token}`)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Unauthorized");
		});
	});

	describe("Deleting a list", () => {
		listToDeleteId = "";

		beforeEach(async () => {
			const listToDelete = {
				title: "This list will be deleted",
			};

			const response = await api
				.post("/api/lists")
				.send(listToDelete)
				.set("Authorization", `bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			listToDeleteId = response.body.list._id;
		});

		it("succeeds when provided a valid token and ID", async () => {
			const response = await api
				.delete(`/api/lists/${listToDeleteId}`)
				.set("Authorization", `bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const listIds = [...response.body.user.lists].map((list) => list._id);
			expect(listIds).not.toContain(listToDeleteId);

			const deletedListResponse = await api
				.get(`/api/lists/${listToDeleteId}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(deletedListResponse.body.error).toBe(
				"Could not find a list with that ID"
			);
		});

		it("fails with status code 400 if token is missing", async () => {
			const response = await api
				.delete(`/api/lists/${listToDeleteId}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 400 if list ID is invalid", async () => {
			listToDeleteId = "wrongId123";

			const response = await api
				.delete(`/api/lists/${listToDeleteId}`)
				.set("Authorization", `bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});

		it("fails with status code 404 if the list is already deleted", async () => {
			await api
				.delete(`/api/lists/${listToDeleteId}`)
				.set("Authorization", `bearer ${token}`)
				.expect(200);

			const response = await api
				.delete(`/api/lists/${listToDeleteId}`)
				.set("Authorization", `bearer ${token}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Could not find a list with that ID");
		});
	});

	describe("Updating a list", () => {
		it("succeeds when provided a valid token and ID", async () => {
			const updatedList = {
				title: "I am updated",
			};

			const response = await api
				.put(`/api/lists/${listId}`)
				.send(updatedList)
				.set("Authorization", `bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const titles = response.body.user.lists.map((list) => list.title);
			expect(titles).toContain(updatedList.title);
		});

		it("fails with status code 400 if token is missing", async () => {
			const updatedList = {
				title: "I am updated",
			};

			const response = await api
				.put(`/api/lists/${listId}`)
				.send(updatedList)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});

		it("fails with status code 400 if listId is invalid", async () => {
			const updatedList = {
				title: "I am updated",
			};

			const incorrectListId = "wrongId123";

			const response = await api
				.put(`/api/lists/${incorrectListId}`)
				.send(updatedList)
				.set("Authorization", `bearer ${token}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Invalid ID");
		});
	});

	describe("Adding, removing and updating links inside a list", () => {
		describe("Adding a link to a list", () => {
			it("succeeds when provided all necessary information", async () => {
				const newLink = {
					title: "Google",
					url: "https://www.google.com",
					description: "This is a link to google",
				};

				const response = await api
					.post(`/api/lists/${listId}/links`)
					.send(newLink)
					.set("Authorization", `bearer ${token}`)
					.expect(201)
					.expect("Content-Type", /application\/json/);

				const descriptions = response.body.list.links.map(
					(link) => link.description
				);

				expect(descriptions).toContain(newLink.description);
			});

			it("fails with status code 400 if token is missing", async () => {
				const newLink = {
					title: "New link",
					url: "https://www.google.com",
					description: "This is a link to google",
				};

				const response = await api
					.post(`/api/lists/${listId}/links`)
					.send(newLink)
					.expect(400)
					.expect("Content-Type", /application\/json/);

				expect(response.body.error).toBe("Token missing");
			});

			it("fails with status code 400 if listId is invalid", async () => {
				const newLink = {
					title: "Google",
					url: "https://www.google.com",
					description: "This is a link to google",
				};

				const incorrectListId = "badId123";

				const response = await api
					.post(`/api/lists/${incorrectListId}/links`)
					.send(newLink)
					.set("Authorization", `bearer ${token}`)
					.expect(400)
					.expect("Content-Type", /application\/json/);

				expect(response.body.error).toBe("Invalid ID");
			});

			it("fails with status code 400 if link title is missing", async () => {
				const newLink = {
					url: "https://www.google.com",
					description: "This is a link to google",
				};

				const response = await api
					.post(`/api/lists/${listId}/links`)
					.send(newLink)
					.set("Authorization", `bearer ${token}`)
					.expect(400)
					.expect("Content-Type", /application\/json/);

				expect(response.body.error).toBe("Links need to have a title");
			});

			it("fails with status code 400 if link url is missing", async () => {
				const newLink = {
					title: "Google",
					description: "This is a link to google",
				};

				const response = await api
					.post(`/api/lists/${listId}/links`)
					.send(newLink)
					.set("Authorization", `bearer ${token}`)
					.expect(400)
					.expect("Content-Type", /application\/json/);

				expect(response.body.error).toBe("Links need to have an url");
			});
		});
	});

	describe("Removing a link from a list", () => {
		let linkId;
		let link;

		beforeEach(async () => {
			const linkToDelete = {
				title: "Delete me",
				url: "https://www.google.com",
				description: "This link will be deleted",
			};

			const response = await api
				.post(`/api/lists/${listId}/links`)
				.send(linkToDelete)
				.set("Authorization", `bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			linkId = response.body.list.links.at(-1)._id;
			link = response.body.list.links.at(-1);
		});

		it("succeeds when provided all necessary information", async () => {
			const response = await api
				.delete(`/api/lists/${listId}/links/${linkId}`)
				.set("Authorization", `bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			console.log(response.body);

			const descriptions = response.body.list.links.map(
				(link) => link.description
			);

			expect(descriptions).not.toContain(link.description);
		});

		it("fails with status code 400 if token is missing", async () => {
			const response = await api
				.delete(`/api/lists/${listId}/links/${linkId}`)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			expect(response.body.error).toBe("Token missing");
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
