const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");
const List = require("../models/listModel");

beforeAll(async () => {
	await User.deleteMany({});
	await List.deleteMany({});

	let token = "";

	// Create a new user
	const user = {
		firstName: "Matilda",
		email: "matildamared@live.se",
		password: "test1234",
	};

	await api.post("/api/users").send(user);
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
	// it("succeeds when provided a valid id", async () => {
	// 	const list = await api
	// 		.get("/api/lists")
	// 		.expect(201)
	// 		.expect("Content-Type", /application\/json/);
	// });
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

afterAll(async () => {
	await mongoose.connection.close();
});
