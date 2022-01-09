const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");
const List = require("../models/listModel");

beforeAll(async () => {
	await User.deleteMany({});

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
		console.log(token);
	});

	test("is added correctly", async () => {
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

		console.log(response);

		// const allBlogs = await api.get("/api/blogs");
		// expect(allBlogs.body).toHaveLength(initialBlogs.length + 1);

		// const blogIds = allBlogs.body.map((blog) => blog.id);
		// expect(blogIds).toContain(blogResponse.body.id);
	});
});

afterAll(async () => {
	console.log("Will try to shut down");
	await mongoose.connection.close();
});
