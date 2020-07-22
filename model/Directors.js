const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Directorschema = new schema({

    name: {
        type: String,
        unique: true,
        required: true,
    },
    surname: {
        type: String,
    },
    bio: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now


    }


});

module.exports = mongoose.model("directors", Directorschema);
