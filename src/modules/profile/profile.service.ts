import { pool } from "../../db/index.js";

const createProfileIntoDB = async (payload: any) => {
  const { user_id, bio, address, phone, gender } = payload;
  // console.log(req.body)

  const user = await pool.query(
    `
    SELECT * FROM users WHERE id=$1  
      `,
    [user_id],
  );
  if (user.rowCount === 0) {
    throw new Error("User not exist in the database!!");
  }

  const result = await pool.query(
    `
            INSERT INTO profile (user_id,bio,address,phone,gender)
            VALUES ($1,$2,$3,$4,$5) RETURNING *
            `,
    [user_id, bio, address, phone, gender],
  );

  return result;
};

export const profileService = {
  createProfileIntoDB,
};
