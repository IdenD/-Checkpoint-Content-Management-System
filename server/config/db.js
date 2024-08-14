const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({ path: "./config/.env" });

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  await mongoose
    .connect(MONGO_DB_URI)
    .then((res) => {
      console.log("Base de données connectée");
    })
    .catch((error) => {
      console.log("Echec de connexion à la base de données : ", error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
