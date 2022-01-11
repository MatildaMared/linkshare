const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const User = require("../models/userModel");

beforeAll(async () => {
	await User.deleteMany({});

	const user = {
		firstName: "Matilda",
		email: "matildamared@live.se",
		password: "test1234",
	};

	await api.post("/api/users").send(user);
});

describe("Creating a new user", () => {
	it("succeeds when provided a first name, unique email and password", async () => {
		const usersAtStart = await User.find({});

		const newUser = {
			firstName: "Vincent",
			email: "vincent@vincent.com",
			password: "test1234",
		};

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const user = response.body.user;

		expect(user.firstName).toEqual("Vincent");

		const usersAtEnd = await User.find({});

		expect(usersAtEnd.length).toBe(usersAtStart.length + 1);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
