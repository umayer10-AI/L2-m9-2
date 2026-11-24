import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

const loginUser = async(req: Request, res: Response) => {

    try{
        const result = await authService.loginUserFromDB(req.body)
        // console.log(result)

        res.status(200).json({
        success: true,
        message: "User Login Successfully",
        data: result,
        });
    }
    catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      data: error,
    });
  }
}

export const authController = {
    loginUser
}