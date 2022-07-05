import authRepository from "./../repositories/authRepository.js";
import tokenMiddlewares from "../middlewares/tokenMiddlewares.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.sendStatus(422);
    }

    const existingUsers = await authRepository.checkExistingUsers(email);

    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    await authRepository.createUser(name, email, hashedPassword);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(422);
    }

    const { rows } = await authRepository.checkExistingUsers(email);
    const [user] = rows;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    const newToken = tokenMiddlewares.generateToken(user.id);
    
    res.send({
      newToken,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}