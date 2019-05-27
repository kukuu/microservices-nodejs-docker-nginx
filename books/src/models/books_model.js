
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Construct Schema
const BookSchema = new Schema({
	name: String,
	type: { type: String, default: "book" },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", BookSchema );
