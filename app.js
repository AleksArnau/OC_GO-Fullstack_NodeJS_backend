const express = require("express");
const mongoose = require("mongoose");
//passé dans routes
// const Thing = require("./models/thing");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

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

//passé dans routes
// //middleware POST, a placer avant les requetes GET
// app.post("/api/stuff", (req, res, next) => {
//   delete req.body._id;
//   const thing = new Thing({
//     ...req.body,
//   });
//   thing
//     .save()
//     .then(() => res.status(201).json({ message: "Objet enregistré !" }))
//     .catch((error) => res.status(400).json({ error }));
// });

// //route GET individuel, a placer apres POST
// app.get("/api/stuff/:id", (req, res, next) => {
//   Thing.findOne({ _id: req.params.id })
//     .then((thing) => res.status(200).json(thing))
//     .catch((error) => res.status(404).json({ error }));
// });

// //requetes PUT, a placer apres GET individuel
// app.put("/api/stuff/:id", (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet modifié !" }))
//     .catch((error) => res.status(400).json({ error }));
// });

// //route DELETE
// app.delete("/api/stuff/:id", (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet supprimé !" }))
//     .catch((error) => res.status(400).json({ error }));
// });

// //route GET
// app.use("/api/stuff", (req, res, next) => {
//   Thing.find()
//     .then((things) => res.status(200).json(things))
//     .catch((error) => res.status(400).json({ error }));
// });

// //middleware
// app.use("/api/stuff", (req, res, next) => {
//   const stuff = [
//     {
//       _id: "oeihfzeoi",
//       title: "Mon premier objet",
//       description: "Les infos de mon premier objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 4900,
//       userId: "qsomihvqios",
//     },
//     {
//       _id: "oeihfzeomoihi",
//       title: "Mon deuxième objet",
//       description: "Les infos de mon deuxième objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 2900,
//       userId: "qsomihvqios",
//     },
//   ];
//   res.status(200).json(stuff);
// });

module.exports = app;
