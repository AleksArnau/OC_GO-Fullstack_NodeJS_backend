const express = require("express");
const mongoose = require("mongoose");
//passé dans routes
// const Thing = require("./models/thing");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const path = require("path");

const app = express();
//base de donnee, a placer apres la declaration de app
mongoose
  .connect(
    "mongodb+srv://Aleks:ClusterOC0passwordmachinebrokempd21%21@clusteroc0.wldhxua.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
//middleware pour interpreter le json du front, a declarer apres la declaration de app
app.use(express.json());

//CORS, a placer avant la route d'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//route pour les requetes /api/stuff
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
