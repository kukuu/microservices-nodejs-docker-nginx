const fetch = require("node-fetch"); //Use fetch API
const express = require("express");

//The SEARCH API is a cross cutting  model , without its own domain. Hasn't got a DB. We fetch from the network
//from both books and video models
//This duplication of models wil be refactored into an npm module and shared as an import back - integrity and consistency
const Video = require("./models/video_model");
const Book = require("./models/book_model");
const app = express();//instantiate express => create app

// root
app.get("/", (req, res ) => {
	res.json({msg: "Search"});
})

//We version the end-points so we can scale it in future using flags(v), and making future additions backward comaptible
//with enrichment from say AI, extending say v1 to v2

//eg.::  /api/v1/search   and /api/v2/search
app.get("/api/v1/search", async (req, res ) => {
	//doesn't make sense waiting for each individual request
	//we make a synchronous requests for the end points, aggregate into an array using de-structuring 
	//and then grab a Promise All
	const videosPromise = Video.find({});
	const booksPromise = Book.find({});
	//de-structure. Combine both requests and store in a variable - promis
	const promises = [ videosPromise, booksPromise  ]
	
	
	//store result of the combined request in an array using await and Promis.all()
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

//Implementing the 1 hop rule:30/05/19
app.get("/api/v1/search/depends-on", async (req, res) => {
	try {
		//we dont want to await. We want to both requests to run at the same time synchronously
		//We fetch from the network

		const videoPromise =  fetch("http://videos:6000/");
		const bookPromise = fetch("http://books:6000/");
		const promises = [videoPromise, bookPromise];//de-structure
		const [videoResponse, bookResponse ] = await Promise.all(promises);
		

		//de-construct and serialise into JSON
		const videoJson = await videoResponse.json();
		const bookJson = await bookResponse.json();

		res.json({video: videoJson, book: bookJson});

	} catch(e){
		res.status(500).json();

	}

});


module.exports = app;
