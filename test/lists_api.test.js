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
			links: {
				title: "Dummy link",
				description: "This is just a dummy link",
				url: "http://www.dummylink.com",
			},
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
			links: [
				{
					title: "A link",
					url: "http://link.com",
					description: "This is a very funny link",
				},
				{
					title: "Another link",
					url: "http://link.com",
					description: "This is a super cool link",
				},
			],
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
			newList = {
				links: [
					{
						title: "A link",
						url: "http://link.com",
						description: "This is a very funny link",
					},
				],
			};

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
		it("succeeds when provided a valid token and ID", async () => {
			console.log("listId is: ", listId);
			const response = await api
				.delete(`/api/lists/${listId}`)
				.set("Authorization", `bearer ${token}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const listIds = [...response.body.user.lists].map((list) => list._id);
			expect(listIds).not.toContain(listId);

			const deletedListResponse = await api
				.get(`/api/lists/${listId}`)
				.expect(404)
				.expect("Content-Type", /application\/json/);

			expect(deletedListResponse.body.error).toBe(
				"Could not find a list with that ID"
			);
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
