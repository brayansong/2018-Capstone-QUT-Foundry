var app = require('express')();
var c = require('cors');
var bp = require('body-parser');

app.use(c());
app.use(bp.json());

require('./routes')(app);

app.listen(8080);
console.log("Server is listening in PORT 8080... \n");

console.log("Path to Get all the event information -> localhost:8080/showAll_Event \n");
console.log("Path to insert new event information -> localhost:8080/insert_Event \n");

console.log("Path to Get all Member information -> localhost:8080/showAll_Member \n");
console.log("Path to register new member information -> localhost:8080/insert_Member \n");

console.log("Path to Get all the Chatroom information -> localhost:8080/showAll_Chatroom \n");
console.log("Path to create a new chatroom -> localhost:8080/insert_Chatroom \n");

console.log("Path to Get all content/article information -> localhost:8080/showAll_Content \n");
console.log("Path to insert new content/article information -> localhost:8080/insert_Content \n");

console.log("Path to Get all the event guest information -> localhost:8080/showAll_Event_Guest \n");
console.log("Path to insert new guest information -> localhost:8080/insert_Event_Guest \n");

console.log("Path to Get all the hot pops booking information -> localhost:8080/showAll_HotPops \n");
console.log("Path to insert the new hot pops bookinh information -> localhost:8080/insert_HotPops \n");

console.log("Path to Get all the Group members information -> localhost:8080/showAll_Members_In_Group \n");
console.log("Path to insert a new member to a group -> localhost:8080//insert_Members_In_Group \n");
