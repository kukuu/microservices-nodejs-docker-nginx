
const express = require("express");
const Book = require("./models/books_model");
const app = express(); //Instantiate express
const bodyParser = require("body-parser");// request/updating DB

app.use(bodyParser.json());


//Requesting  API resource - route
//root 
app.get("/", (req, res ) => {
	res.json({ msg: "Books Domain"})
});


//GET :: Versioning API: "books"
app.get("/api/v1/books", async () => {
	//cache request fetch with await from model
	const books = await Book.find({})
	res.json(books);
})

//POST - sending object to DB
app.post("", async () => {
	//cache instance post object
	const book = new Book({ name: req.body.name });
	const savedBook = await book.saved();
	res.json(savedBook);
});


module.exports = app;
