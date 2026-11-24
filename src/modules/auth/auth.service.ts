import bcrypt from "bcryptjs";
import { pool } from "../../db/index.js";
import type { ILogin } from "./auth.interface.js";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const loginUserFromDB = async(payload: ILogin) => {

    const {email, password} = payload

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,
        [email]
    )

    // console.log(user.rows[0])

    if (user.rowCount === 0) {
        throw new Error("Invalid credentials!!");
    }

    const matchPassword = await bcrypt.compare(password, user.rows[0].password)

    if(!matchPassword) {
        throw new Error("Invalid credentials!!");
    }

    if (!user.rows[0].is_active) {
        throw new Error("Access denied!!");
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload,
        config.jwt_Secret, {
            expiresIn: "1d"
        }
    )

    delete user.rows[0].password

    return {accessToken, user: user.rows[0]}

}

export const authService = {
    loginUserFromDB
}