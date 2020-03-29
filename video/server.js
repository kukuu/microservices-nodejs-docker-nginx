
//Server.js file for book service
const  app = require("./src/app");
const { DB_URI } =require("./src/config");
const mongoose = require("mongoose");
mongoose.connect(DB_URI);

app.listen(3011, () => {
	console.log("Running on port 8070");
	console.log(".....................")
});
