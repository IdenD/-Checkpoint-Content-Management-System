const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const router = require("./routes/userRoute");

dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 7000;

// Connexion à la base de données
connectDB();

// Middleware pour traiter les données des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

// Creation des routes
app.use("/api", router);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`serveur en cours  sure le port ${PORT}`);
});
