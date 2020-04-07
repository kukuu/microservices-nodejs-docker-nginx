# MongoDB



MongoDB  is a cross-platform document-oriented  NoSQL database. Classified as a NoSQL database, MongoDB eschews the traditional table-based relational database structure in favour of JSON-like documents with dynamic schemas (MongoDB calls the format BSON), making the integration of data in certain types of applications easier and faster.First developed by the software company 10gen (now MongoDB Inc.) in October 2007.As of 2014, MongoDB was the most popular NoSQL database system.

## Main features:

```
1. Document: oriented

2. Adhoc queries(on index, ranges, regular expression)

3. Indexing

4. Replication

5. Load balancing

6. File storage

7. Aggregation (map reduce)

8. Capped collection

9. Server side javascript execution.
```


### Document-oriented

   Instead of taking a business subject and breaking it up into multiple relational structures, MongoDB can store the business subject in the minimal number of documents. For example, instead of storing title and author information in two distinct relational structures, title, author, and other title-related information can all be stored in a single document called Book, which is much more intuitive and usually easier to work with.

### Ad hoc queries

   MongoDB supports search by field, range queries, regular expression searches. Queries can return specific fields of documents and also include user-defined JavaScript functions.

### Indexing

   Any field in a MongoDB document can be indexed (indices in MongoDB are conceptually similar to those in RDBMS). Secondary indices are also available.

### Replication

MongoDB provides high availability with replica sets. A replica set consists of two or more copies of the data. Each replica set member may act in the role of primary or secondary replica at any time. The primary replica performs all writes and reads by default. Secondary replicas maintain a copy of the data on the primary using built-in replication. When a primary replica fails, the replica set automatically conducts an election process to determine which secondary should become the primary. Secondaries can also perform read operations, but the data is eventually consistent by default.

### Load balancing

MongoDB scales horizontally using sharding. The user chooses a shard key, which determines how the data in a collection will be distributed. The data is split into ranges (based on the shard key) and distributed across multiple shards. (A shard is a master with one or more slaves.)

MongoDB can run over multiple servers, balancing the load and/or duplicating data to keep the system up and running in case of hardware failure. Automatic configuration is easy to deploy, and new machines can be added to a running database.

### File storage

MongoDB can be used as a file system, taking advantage of load balancing and data replication features over multiple machines for storing files.

This function, called GridFS, is included with MongoDB drivers and available with no difficulty for development languages. MongoDB exposes functions for file manipulation and content to developers. GridFS is used, for example, in plugins for NGINX and lighttpd. Instead of storing a file in a single document, GridFS divides a file into parts, or chunks, and stores each of those chunks as a separate document.

In a multi-machine MongoDB system, files can be distributed and copied multiple times between machines transparently, thus effectively creating a load-balanced and fault-tolerant system.

### Aggregation

MapReduce can be used for batch processing of data and aggregation operations. The aggregation framework enables users to obtain the kind of results for which the SQL GROUP BY clause is used.

### Server-side JavaScript execution

JavaScript can be used in queries, aggregation functions (such as MapReduce), and sent directly to the database to be executed.

### Capped collections

MongoDB supports fixed-size collections called capped collections. This type of collection maintains insertion order and, once the specified size has been reached, behaves like a circular queue. 

Unsigned can hold a larger positive value, and no negative value. Unsigned uses the leading bit as a part of the value, while the signed version uses the left-most-bit to identify if the number is positive or negative. signed integers can hold both positive and negative numbers.



## Importing data into MongoDB from terminal:

```
Alexanders-MacBook-Pro:bin alexanderadu-sarkodie$ mongoimport
--db test --collection donorschoose  --type json --file 
/Library/WebServer/Documents/encryption-ware/Interactive-
Data-Visualisation-D3-DC-NodejsMongoDB
/feed/sampledata.json  --jsonArray

```


At a prompt in a terminal window (or a command prompt for Windows), go to your

 <mongodb installation dir> : cd <mongodb installation dir>
Type ./bin/mongo to start mongo : ./bin/mongo.



## Useful commands

```
show dbs
use contacts
db.contactlist.insert({name:’alex’,email:’blah.com’})
db.contactlist.insert([{name:’alex’,email:’blah.com’},{},{}])
db.contactlist.find()
db.contactlist.find().pretty()

```

## Resources

1. https://www.youtube.com/watch?v=OrNUnlB4AmQ 

2. https://www.youtube.com/watch?v=2ajlfURobd8 

3. https://www.youtube.com/watch?v=h1hLeGMdBv4

4. http://www.learn-with-video-tutorials.com

5. https://docs.mongodb.org/getting-started/shell/

6. https://docs.mongodb.org/getting-started/shell/introduction/

7. https://www.youtube.com/watch?v=THCiObgXxTg

8. https://www.youtube.com/watch?v=h1hLeGMdBv4
