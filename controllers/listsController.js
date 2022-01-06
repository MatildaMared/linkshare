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
		const { title } = req.body;

		// grabs the JWT token from the http request headers
		const token = req.headers.authorization.split(" ")[1];

		// gets userId based on decoded jwt
		const userId = await getUserIdFromToken(token);

		// Return error if jwt token could not be decoded
		if (userId === null) {
			return next(new ErrorResponse("Unauthorized", 400));
		}

		// Finds user in database based on id in decoded JWT token
		const user = await User.findById(userId);

		// Creates new empty list
		const list = await List.create({
			_id: new mongoose.Types.ObjectId(),
			userId: user._id,
			title: title,
			links: [],
		});

		// Push the list ID into the user lists array
		user.lists.unshift(list._id);

		// Save changes in user to database
		const updatedUser = await user.save();

		// Populate the lists array before sending data back to user
		await updatedUser.populate("lists");

		// Send back the created list
		// and user in the response
		res.status(200).json({
			success: true,
			list,
			user: {
				id: updatedUser._id,
				firstName: updatedUser.firstName,
				email: updatedUser.email,
				lists: updatedUser.lists,
			},
		});
	} catch (err) {
		next(err);
	}
}

module.exports = { createList };
