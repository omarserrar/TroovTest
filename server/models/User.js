const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    nom:  String,
    email: String,
    password:   String
});
const User = mongoose.model('User', userSchema);
module.exports = User;  