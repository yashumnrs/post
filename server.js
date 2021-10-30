const express = require("express");
const mongoose =require("mongoose");
const app = express();

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
//connecytion to mongodb 
mongoose.connect("mongodb+srv://Admin:123@cluster0.zib5z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlparser: true,
    useUnifinedTopology: true
})

//creating the model
const noteSchema ={
    title: String,
    content: String
}

const Note=mongoose.model("Note",noteSchema);
//connecting server to view
app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html")
})

//posting to MongoDb
app.post("/", function(req, res){
    let newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })

    newNote.save();
    res.redirect("/");
})

app.listen(4000, function(){
    console.log("Server is running  in 4000");
})