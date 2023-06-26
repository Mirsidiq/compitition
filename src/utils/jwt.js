import jwt from "jsonwebtoken";
const sign = (payload) =>
  jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (
        err instanceof jwt.JsonWebTokenError ||
        err instanceof jwt.TokenExpiredError
      ) {
        reject(err);
      }
      resolve(decode);
    });
  });
};
export { sign, verify };
