var express = require("express");
var path = require("path");
const { RSA_PSS_SALTLEN_AUTO } = require("constants");

var app = express();
var PORT = 3000;

//Creating tables array

var notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/api/notes", function(req, res) {
    return res.json(notes);
});
app.delete("/api/notes/:id", function(req, res) {
    console.log("deleting note")
    var chosen = req.params.id
    var index = 0;
    for (i=0; i<notes.length; i++){
        if(chosen==notes[i].id){
            index = i;
        }
    }
    notes.splice(index,1)
    console.log(notes)
    return res.json(notes);
});
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
   notes.push(newNote)
    res.json(notes);
});
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});