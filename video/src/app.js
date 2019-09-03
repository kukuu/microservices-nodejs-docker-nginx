
const express = require("express");
const Video = require("./models/video_model");
const app = express(); //Instantiate express
const bodyParser = require("body-parser");// request/updating DB

app.use(bodyParser.json());


//Requesting  API resource - route
app.get("/", (req, res ) => {
	res.json({ msg: "Videos Domain"})
});


//GET :: Versioning API: "videoss"
app.get("/api/v1/videos", async () => {
	//cache request
	const videos = await Video.find({})
	res.json(videos);
})

//POST - sending object to DB
app.post("", async () => {
	//cache instance post object
	const video = new Video({ name: req.body.name });
	const savedVideo = await video.saved();
	res.json(savedVideo);
});


module.exports = app;