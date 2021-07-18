const User = require("../models/userModel");

async function signup() {
	console.log("Sign up");
}

async function login() {
	console.log("Log in");
}

function logout() {
	console.log("Log out");
}

module.exports = { signup, login, logout };
