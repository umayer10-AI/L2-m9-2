import { pool } from "../../db/index.js";
import type { Id, IUser } from "./user.interface.js";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, age, role } = payload;
    // console.log(req.body)

    const hashPassword = await bcrypt.hash(password, 10)
    // console.log(hashPassword)

    const result = await pool.query(
      `
            INSERT INTO users (name,email,password,age,role)
            VALUES ($1,$2,$3,$4,COALESCE($5,'user')) RETURNING *
            `,
      [name, email, hashPassword, age, role],
    );

    delete result.rows[0].password
    return result
}

const getUserDB = async () => {
    const result = await pool.query(`
            SELECT * FROM users
            `)

    return result
}

const singleGetUserDB = async (payload: any) => {
    
    const {id} = payload
        const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
            `, [id])

    return result
}

const updateUserIntoDB = async (payload: any) => {

    const {id} = payload.params
        const {name, password, age, is_active} = payload.body
        // console.log(req.body)

        const result = await pool.query(`
            UPDATE users
            SET
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            age = COALESCE($3, age),
            is_Active = COALESCE($4, is_Active),
            updated_At = NOW()
            WHERE id=$5 RETURNING *
            `,[name??null, password??null, age??null, is_active??null, id]
        )

        return result
}

const deleteUserIntoDB = async(id: any) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `,
            [id]
        )
        return result
}

export const userService = {
    createUserIntoDB,
    getUserDB,
    singleGetUserDB,
    updateUserIntoDB,
    deleteUserIntoDB
}