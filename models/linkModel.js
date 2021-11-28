const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	list_id: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
	title: {
		type: String,
		required: [true, "Please enter a title..."],
	},
	description: {
		type: String,
	},
	url: {
		type: String,
		required: [true, "Please enter a url..."],
	},
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
