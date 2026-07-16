const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database Connection Error:", err);

        process.exit(1);
    }
}

module.exports = connectDB;