import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import responseHandler from "../response/responseHandler.js";

export default function comparer(user, foundUser, response, next) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  // TODO: Set token time to a month
  //const TEST_INTERVAL = 30;
  let msg = {};

  bcrypt.compare(user.wachtwoord, foundUser.wachtwoord, (err, result) => {
    if (err) {
      next(err);
    } else if (!result) {
      msg = {
        msg: "Invalid credentials, try again",
        status: false,
      };
    } else {
      // TODO: Add secret key here
      const token = jwt.sign({ foundUser }, "process.env.SECRET_KEY", {
        expiresIn: ONE_WEEK,
      });
      const temp = jwt.decode(token);
      msg = {
        msg: "Login succesful",
        status: true,
        id: foundUser.id,
        voornaam: foundUser.voornaam,
        achternaam: foundUser.achternaam,
        rol: foundUser.rol,
        token: token,
        iat: temp.iat,
        exp: temp.exp,
        bedrijf_id: foundUser.bedrijf_id,
        bedrijf_naam: foundUser.bedrijf_naam
      };
    }
    responseHandler(err, msg, response, next);
  });
}
