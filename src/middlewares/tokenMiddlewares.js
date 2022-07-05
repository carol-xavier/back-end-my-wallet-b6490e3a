import jwt from "jsonwebtoken";

async function generateToken(id) {

  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET
  );
}

export async function verifyToken(req, res, next) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");

    if (!token) {
      return res.sendStatus(401);
    }
    let user;

    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }

  next();
}