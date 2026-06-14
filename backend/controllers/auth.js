import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const { JWT_SECRET = "secret-key" } = process.env;

export const register = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ message: "Email o contraseña incorrectos" });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(401)
            .send({ message: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign(
          { _id: user._id },
          process.env.NODE_ENV === "production"
            ? process.env.JWT_SECRET
            : "dev-secret",
          { expiresIn: "7d" },
        );

        return res.send({ token });
      });
    })
    .catch(next);
};
