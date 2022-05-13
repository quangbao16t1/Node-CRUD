import jwt from ("jsonwebtoken");
import Auth from "../configs/auth.config.js";
import UserModel from "../models/user.model.js"
import RoleModel from "../models/role.model.js"

const AuthJwt = {};

AuthJwt.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, Auth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
AuthJwt.isAdmin = (req, res, next) => {
  UserModel.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    RoleModel.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};
AuthJwt.isManager = (req, res, next) => {
  UserModel.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    RoleModel.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "manager") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Manager Role!" });
        return;
      }
    );
  });
};

export default AuthJwt;
