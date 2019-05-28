const fetch = require("node-fetch"); //Use fetch API
const express = require("express");

//The SEARCH API is a cross cutting  model , without its own domain. Hasn't got a DB. We fetch from the network
//from both books and video models
//This duplication of models wil be refactored into an nmp module and imported back for integrity and consistency
const Video = require("./models/video_model");
const Book = require("./models/book_model");
const app = express();

// root
app.get("/", (req, res ) => {
	res.json({msg: "Search"});
})

//We version the end-points so we can scale it in future using flags(v), and making future additions backward comaptible
// introducing an exende v2 following a V1
//eg.::  /api/v1/search   and /api/v2/search
app.get("/api/v1/search", async (req, res ) => {
	//doesn't make sense waiting for each individual request
	//we make a synchronous requests for the end points, aggregate into an array using de-structuring 
	//and then grab a Promise All
	const videosPromise = Video.find({});
	const booksPromise = Book.find({});
	//de-structure
	const promises = [ videosPromise, booksPromise  ]
	const [ videos, books ] = await Promise.all(promises);

	
	//aggregate the requests into one service call
	res.json(videos.concat(books));


	//Calling other services from a service is dangerous, if those services make their own calls
	//This can result in "circular calls". 

	//If no further dependency calls are made as in our case, then is fine. Else use a message queue -  Kafka or RabitMQ 
	// to manage the queing/buffering , which enhances availability though.

	//***********************************************************************

	//I  will re-factor and implement the 1 hop rule in my next commit, when we fetch from the network. 
	//This is when a service will not start more than one call chain
	//search -> books|videos -> <no more calls>
	
	//************************************************************************

	

	

});


module.exports = app;