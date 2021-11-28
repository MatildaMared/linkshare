const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
	owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: {
		type: String,
		required: [true, "Please enter a list title..."],
	},
	links: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Link",
		},
	],
});

const List = mongoose.model("List", listSchema);
