// var msg = "hola mundo";
// console.log(msg);

var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require('nedb');

var port = 3000;
var BASE_API_PATH = "/api/v1";
var DB_FILE_NAME = __dirname + "/contacts.json";


/*var contacts = [
    {"name" : "Antonio", "phone" : "656676"},
    {"name" : "Patricia", "phone" : "788765"}
];*/

console.log("Starting API server...");
var app = express();
app.use(bodyParser.json());

//Creamos BD
var db = new DataStore();
/*var db = new DataStore({
    filename: DB_FILE_NAME,
    autoload: true
});*/

app.get("/", (req, res) => {
    res.send("<html><body><h1>My server...</h1></body></html>")
});

/*app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts");
    res.send(contacts);
});*/

app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts");
    db.find({}, (err, contacts) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.send(contacts);
        }
    });
});

app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - POST /contacts");
    var contact = req.body;
    db.insert(contact, (err) => {
        if (err) {
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
    //contacts.push(contact);
    //res.sendStatus(201);
});

app.listen(port);

console.log("Server ready!!!");