const mongoose = require('mongoose');

const url = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/authTest";

const configDataBase = () => {

    // todo add connection params
    mongoose.connect(url, { useNewUrlParser: true });

    const db = mongoose.connection

    db.once('open', _ => {
        console.log(`Database connected: ${url}`);
    });

    db.on('error', err => {
        console.log(`connection error: ${err}`);
    });
}

configDataBase();