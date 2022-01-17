const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
	title: {
		type: String,
		required: [true, "Please enter a list title"],
	},
	createdAt: { type: Date, default: Date.now },
	links: [
		{
			title: {
				type: String,
				required: [true, "Links need to have a title"],
			},
			url: {
				type: String,
				required: [true, "Links need to have an url"],
			},
			description: { type: String, default: "" },
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
