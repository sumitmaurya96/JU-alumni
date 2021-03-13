const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    fullname: String,
    username: String,
    password: String
});

module.exports = mongoose.model('user', UserSchema, 'users');
