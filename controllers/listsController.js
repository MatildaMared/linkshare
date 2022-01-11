const mongoose = require("mongoose");
const List = require("../models/listModel");
const ErrorResponse = require("../utilities/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function getUserIdFromToken(token) {
	let userId = null;
	// tries to decode the JWT token
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		// If there was an error trying to decode the JWT,
		// return an error response
		if (err) {
			return null;
		}

		userId = decoded.id;
	});
	// If there was no error, return
	// the id from the decoded JWT
	return userId;
}

async function createList(req, res, next) {
	try {
		const { title, links } = req.body;

		// grabs the JWT token from the http request headers
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return next(new ErrorResponse("Token missing", 400));
		}

		// gets userId based on decoded jwt
		const userId = await getUserIdFromToken(token);

		// Return error if jwt token could not be decoded
		if (userId === null) {
			return next(new ErrorResponse("Unauthorized", 401));
		}

		// Finds user in database based on id in decoded JWT token
		const user = await User.findById(userId);

		// Creates new list
		const list = await List.create({
			_id: new mongoose.Types.ObjectId(),
			userId: user._id,
			title: title,
			links: links,
		});

		// Push the list ID into the user lists array
		user.lists.unshift(list._id);

		// Save changes in user to database
		await user.save();

		// Populate the lists array before sending data back to user
		const updatedUser = await User.findById(userId).populate("lists");

		// Send back the created list
		// and user in the response
		res.status(201).json({
			success: true,
			list,
			user: updatedUser,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createList };
