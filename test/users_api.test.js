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

	it("fails with status code 400 when first name is missing", async () => {
		const newUser = {
			email: "testmail@test.com",
			password: "test1234",
		};

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(response.body.error).toBe("Please enter a first name");
	});

	it("fails with status code 400 when password is missing", async () => {
		const newUser = {
			firstName: "Anna",
			email: "testmail@test.com",
		};

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(response.body.error).toBe("Please enter a password");
	});

	it("fails with status code 400 when email is missing", async () => {
		const newUser = {
			firstName: "Lena",
			password: "test1234",
		};

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(response.body.error).toBe("Please enter an email");
	});

	it("fails with status code 400 when email is already in use", async () => {
		const newUser = {
			firstName: "Tilda",
			email: "matildamared@live.se",
			password: "test1234",
		};

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(response.body.error).toBe("Email is already registered");
	});

	it("fails with status code 400 when email is invalid", async () => {
		const newUser = {
			firstName: "Karin",
			email: "karinsmail",
			password: "test1234",
		};

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(response.body.error).toBe("Please enter a valid email");
	});

	it("fails with status code 400 when password contains less than 8 characters", async () => {
		const newUser = {
			firstName: "Olof",
			email: "olof@olof.com",
			password: "123",
		};

		const response = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(response.body.error).toBe("Password needs to be at least 8 characters long");
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
