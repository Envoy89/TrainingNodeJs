const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = {
    username: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        requiered: true,
    },
    passwordHash: {
        type: String,
        requiered: true,
    },
}

const User = mongoose.model('User', userSchema);

module.exports = User;