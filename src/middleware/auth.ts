import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../db/index.js";
import type { Role } from "../types/index.js";

export const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(roles)
      // console.log(req.headers.authorization)

      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "UnAuthorize Access",
        });
      }

      const decode = jwt.verify(
        token as string,
        config.jwt_Secret,
      ) as JwtPayload;

      // console.log(decode)

      const user = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `,
        [decode.email],
      );

      // console.log(user.rows[0])

      if (user.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (!user.rows[0].is_active) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(401).json({
          success: false,
          message: "Unauthorize Access",
        });
      }

      req.user = decode;
      // console.log(req)

      next();
    } catch (error) {
      next(error);
    }
  };
};
