import mongoose from "mongoose";
import validator from "validator";

// 🔹 Regex para validar URLs
const urlRegex = /^https?:\/\/(www\.)?[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "URL inválida",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Correo inválido",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model("user", userSchema);
