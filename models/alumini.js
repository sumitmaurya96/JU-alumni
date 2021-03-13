const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AluminiSchema = new Schema({
    email: String,
    fullname: String,
    linkedin: String,
    contact: String,
    department: String,
    currentjob: String,
    passoutyear: String
});

module.exports = mongoose.model('alumini', AluminiSchema, 'aluminies');