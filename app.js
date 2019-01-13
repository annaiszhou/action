var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require('method-override');
    
mongoose.connect("mongodb://localhost:27017/todolist_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

var todolistSchema = new mongoose.Schema({
    title: String,
    summary: String,
    Completed: Boolean,
    timeCreated:  {type: Date, default: Date.now},
    timeCompleted:  {type: Date, default: Date.now},
});

var Todolist = mongoose.model("Diary", todolistSchema);

app.get("/", function(req, res){
    res.redirect("/welcome");
});

app.get("/welcome", function(req, res){
    res.render("welcome");
});

app.get("/todolists", function(req, res){
    Todolist.find({}, function(err, todolists){
        if(err){
            console.log(err);
        } else {
            res.render("index", {todolists: todolists}); 
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
})

