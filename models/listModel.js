const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: {
		type: String,
		required: [true, "Please enter a list title..."],
	},
	links: [
		{
			title: String,
			url: String,
			description: String,
		},
	],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
