export const errorHandler = (err, _, res, next) => {
  if (err) {
    res.status(err.status).json({
      status:err.status,
      message: err.message,
    });
  }
  next();
};
