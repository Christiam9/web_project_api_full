import { register, login } from "./controllers/auth.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./middlewares/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import { errors } from "celebrate";
import logger from "./middlewares/logger.js";

import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";

dotenv.config();

const allowedOrigins = [
  "https://api.aroun1.chickenkiller.com",
  "https://aroun1.chickenkiller.com",
  "https://www.aroun1.chickenkiller.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(
        new Error(
          "The CORS policy for this site does not allow access from the specified Origin.",
        ),
        false,
      );
    }

    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

// ✅ CORS CORRECTO (ARREGLADO)
app.use(cors(corsOptions));

// logs
app.use((req, res, next) => {
  console.log("➡️ request:", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    time: new Date().toISOString(),
  });

  next();
});

app.use(express.json());

// DB
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error MongoDB:", err));

// rutas públicas
app.post("/signup", register);
app.post("/signin", login);

// auth middleware
app.use(auth);

// rutas protegidas
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

// errors
app.use(errors());

// 404
app.use((req, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
