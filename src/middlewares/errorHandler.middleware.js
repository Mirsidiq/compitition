export const errorHandler = (err, _, res, next) => {
  if (err) {
    res.status(err.status).json({
      message: err.message,
    });
  }
  next();
};
