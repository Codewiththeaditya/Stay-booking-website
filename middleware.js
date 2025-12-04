const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./expressError.js");


app.use(express.static(path.join(__dirname,'public')))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);



const checkToken = (req,res,next)=>{
    let {token} = req.query;
    if (token == "giveaccess"){
        next();
    }else{
        throw new ExpressError(403,"Access Denied")
    }
    res.send("Data");
};

app.get("/api",checkToken,(req,res)=>{
    res.send("Data");
});

app.use((err,req,res,next)=>{
    let {status=400,message} = err;
    res.status(status).send(message);
})

app.listen(8080, ()=>{
    console.log("server is listening at port 8080 !");
});