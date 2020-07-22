const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Usersschema = new schema({

    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 5

    },
    createAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("users", Usersschema);
