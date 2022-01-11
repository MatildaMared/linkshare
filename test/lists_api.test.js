const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");
const List = require("../models/listModel");

beforeAll(async () => {
	await User.deleteMany({});
	await List.deleteMany({});

	const user = {
		firstName: "Matilda",
		email: "matildamared@live.se",
		password: "test1234",
	};

	await api.post("/api/users").send(user);
});

describe("Creating a new list", () => {
	let token = "";

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

	it("is added correctly when provided all neccessary information", async () => {
		const newList = {
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

		const response = await await api
			.post("/api/lists")
			.send(newList)
			.set("Authorization", `bearer ${token}`)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		expect(response.body.list.title).toBe(newList.title);
	});

	it("fails with status code 400 if list title is missing", async () => {
		const newList = {
			links: [
				{
					title: "A link",
					url: "http://link.com",
					description: "This is a very funny link",
				},
			],
		};

		const response = await await api
			.post("/api/lists")
			.send(newList)
			.set("Authorization", `bearer ${token}`)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(response.body.error).toBe("Please enter a list title");
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
