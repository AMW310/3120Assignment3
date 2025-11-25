let mongoose = require("mongoose");

let courseModel = mongoose.Schema({
    name: String,
    age: Number,
    major: String,
    gpa: Number
    },
    {
        collections:"courses"
    }
);
module.exports=mongoose.model('Course',courseModel)