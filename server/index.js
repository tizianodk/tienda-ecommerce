const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/ProductRoutes.js");
const ordenRoutes = require("./routes/ordenRoutes.js");
const { stripeWebhook } = require("./controllers/webhook.js"); // 👈 Asegúrate de importar correctamente
const resenasRoutes = require("./routes/reseñasRoutes.js");

const server = express();

// ✅ Webhook: usar bodyParser.raw ANTES de express.json()
server.post("/webhook", bodyParser.raw({ type: "application/json" }), stripeWebhook);

// Luego los demás middlewares
server.use(cors());
server.use(express.json());
server.use("/uploads", express.static("uploads"));
server.use("/usuarios", userRoutes);
server.use("/productos", productRoutes);
server.use("/ordenes", ordenRoutes);
server.use("/resenas", resenasRoutes); 

// Conexión Mongo
mongoose.connect("mongodb://localhost:27017/tienda2")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión:", err));

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
