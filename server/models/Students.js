const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
    email: String,
    password: String
})

const StudentsModel = mongoose.model("students", StudentsSchema)
module.exports = StudentsModel