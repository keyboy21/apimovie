const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://Movies:m3D4fAQI10kd8SXZ@cluster0.whpma.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    const db = mongoose.connection;
    db.on('open', () => {
        console.log("Mongo dbga onlayn ulandi");
    })
    db.on("error", (err) => {
        console.log("Mongo dbga ulanmadi", err);
    })
}
