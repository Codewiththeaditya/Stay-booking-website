const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let passportLocalMongoose = require("passport-local-mongoose");
passportLocalMongoose = passportLocalMongoose.default || passportLocalMongoose;


const userSchema = new Schema({
    email:{
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);
console.log("Type of plugin:", typeof passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
