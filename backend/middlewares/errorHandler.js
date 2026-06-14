import logger from "./logger.js";

export default (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    time: new Date().toISOString(),
  });
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? "Error en el servidor" : err.message;

  res.status(statusCode).send({ message });
};
