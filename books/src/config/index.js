let DB_URI = "mongodb://localhost:27017/microservices-nodejs-docker-nginx";

//Will be re-configured with nginx with service name for proxy-ing
//The containers IP addresses are dynamic, and can be deployed from any available pot that is available
//service names are used
if(process.env.MONGO_DB_URI){
	DB_URI = process.env.MONGO_DB_URI
}

module.exports = {
	DB_URI
};
