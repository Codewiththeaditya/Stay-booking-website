const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
.then(()=>{
    console.log("connect to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.use(express.static(path.join(__dirname,'public')))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);







app.use("/listings/:id/reviews", reviews);
app.use("/listings", listings);

app.get('/', (req,res)=>{
    res.send("this is root !");
});





//Custom error handeler :

app.all(/.*/, (req,res,next)=>{
    next(new ExpressError(404,"Page Not Found !"))

})

app.use((err,req,res,next) => {
    let {status=400,message} = err;
    res.render("error.ejs", {message})
    //res.status(status).send(message);
})

app.listen(8080, ()=>{
    console.log("server is listening at port 8080 !");
});