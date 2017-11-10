var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var session = require('express-session');
app.use(session({secret: 'codingdojorocks'}));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
var path = require('path');
app.set('views', path.join(__dirname, './views'));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quote');

app.get("/", function(req, res) {
    res.render("index")
})
mongoose.connect('mongodb://localhost/quote');

var QuoteSchema = new mongoose.Schema({
    name: {type: String},
    quote: {type: String}
}, {timestamps:true})
mongoose.model("Quote", QuoteSchema);
var Quote = mongoose.model("Quote");
mongoose.Promise = global.Promise;
app.post("/new", function(req, res) {
    var quote = new Quote(req.body);
    quote.save(function(err) {
        if(err) {
            res.render("index", {error: quote.errors})
        }
        else {
            res.redirect("/quote");
        }
    })
})
app.get("/quote", function(req, res) {
    var quote;
    Quote.find({}, function(err, quote) {
        console.log(quote);
        res.render("showQuote", {quotes: quote})
    })
})

app.listen(8000, function() {
    console.log("success connecting.")
})