const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb+srv://Theaditya778:mysecretkey@cluster0.atjx2p5.mongodb.net/wanderlust?retryWrites=true&w=majority';

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main (){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    await Listing.insertMany(initData.data);
    console.log('data was initialized');
}

initDB();