import jwt from "jsonwebtoken"

export default function (req, res, next) {
  if (req.headers["authorization"]) {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    // TODO: Add proper secret key
    jwt.verify(token, "process.env.SECRET_KEY", (err, user) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.bedrijf_id = user.foundUser.bedrijf_id;
        req.user_id = user.foundUser.id;
        next();
      }
    });
  } else {
    return res.sendStatus(403);
  }
};