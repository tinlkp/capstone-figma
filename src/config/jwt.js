import jwt from "jsonwebtoken";

export const createToken = (data) => {
  let token = jwt.sign({ data }, "TOKEN", {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  return token;
};

export const checkToken = (token) =>
  jwt.verify(token, "TOKEN", (error, decoded) => error);

export const createRefToken = (data) => {
  let token = jwt.sign({ data }, "REFRESH", {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return token;
};
export const checkRefToken = (token) =>
  jwt.verify(token, "REFRESH", (error, decoded) => error);

export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const verifyToken = (req, res, next) => {
  let { token } = req.headers;
  let check = checkToken(token);

  if (check == null) {
    next();
  } else {
    res.status(401).send(check.name);
  }
};
