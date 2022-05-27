const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    title: String,
    brand: String,
    image: String,
    color: String,
    rating: String,
});

module.exports = mongoose.model('User', userSchema);