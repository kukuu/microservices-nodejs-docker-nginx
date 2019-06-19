
//Server.js file for book service
//One of 3 micro-services
//will be replicated in video service
const  app = require("./src/app");
const { DB_URI } =require("./src/config");
const mongoose = require("mongoose");
mongoose.connect(DB_URI);

app.listen(3000, () => {
	console.log("Running on port 8000");
	console.log(".....................")
});
