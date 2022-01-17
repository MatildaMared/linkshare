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

		// Send success response, created list and user data back to user
		res.status(201).json({
			success: true,
			list,
			user: updatedUser,
		});
	} catch (err) {
		next(err);
	}
}

async function getListById(req, res, next) {
	try {
		// Get listId from params
		const listId = req.params.listId;

		// Find list in the database
		const list = await List.findOne({ _id: listId });

		if (!list) {
			return next(new ErrorResponse("Could not find a list with that ID", 404));
		}

		// Send success response and list data back to user
		res.status(200).json({
			success: true,
			list,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteList(req, res, next) {
	try {
		// Get listId from params
		const listId = req.params.listId;

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
		const user = await User.findById(userId).populate("lists");

		if (user) {
			// Find and delete list in the database
			const list = await List.findByIdAndDelete(listId);

			if (!list) {
				return next(
					new ErrorResponse("Could not find a list with that ID", 404)
				);
			}
		}

		// Remove list id from user lists array
		user.lists = user.lists.filter((list) => list._id.toString() !== listId);

		// Save changes in user to database
		await user.save();

		// Send success response and user data back to user
		res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		next(err);
	}
}

async function updateList(req, res, next) {
	try {
		const { title } = req.body;

		// Get listId from params
		const listId = req.params.listId;

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
		const user = await User.findById(userId).populate("lists");

		if (user) {
			// Find and delete list in the database
			const list = await List.findByIdAndUpdate(listId, {
				title: title,
			});

			if (!list) {
				return next(
					new ErrorResponse("Could not find a list with that ID", 404)
				);
			}
		}

		const updatedList = await List.findById(listId);
		const updatedUser = await User.findById(userId).populate("lists");

		// Send success response and user data back to user
		res.status(200).json({
			success: true,
			updatedList: updatedList,
			user: updatedUser,
		});
	} catch (err) {
		next(err);
	}
}

async function addLink(req, res, next) {
	try {
		const listId = req.params.listId;
		const { title, url, description } = req.body;

		if (!description) {
			description = "";
		}

		// grabs the JWT token from the http request headers
		const token = getToken(req, res, next);

		// gets userId based on token
		const userId = await getUserIdFromToken(token);

		// Return error if jwt token could not be decoded
		if (userId === null) {
			return next(new ErrorResponse("Unauthorized", 401));
		}

		// Finds user in database based on id in decoded JWT token
		const user = await User.findById(userId).populate("lists");

		let list = "";

		if (user) {
			// Finds list in database based on listId
			list = await List.findById(listId);

			if (!list) {
				return next(
					new ErrorResponse("Could not find a list with that ID", 404)
				);
			}

			// Add new link to list
			list.links.push({ title, url, description });

			// Save changes in list to database
			await list.save();
		}

		const updatedUser = await User.findById(userId).populate("lists");

		// Send success response and user data back to user
		res.status(201).json({
			success: true,
			list,
			user: updatedUser,
		});
	} catch (err) {
		console.log("💥 ERROR: ", err);
		next(err);
	}
}

function getToken(req, res, next) {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return next(new ErrorResponse("Token missing", 400));
	}
	return token;
}

module.exports = { createList, getListById, deleteList, updateList, addLink };
