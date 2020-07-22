const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Schema = new schema({

    title: {
        type: String,
        required: true,
        
    },
    category: String,
    country: String,
    year: Number,
    director_id: schema.Types.ObjectId,
    imd_score: Number,
    createAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("movies", Schema);
