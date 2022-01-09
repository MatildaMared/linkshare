const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
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

listSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		delete returnedObject.__v;
	},
});

const List = mongoose.model("List", listSchema);

module.exports = List;
