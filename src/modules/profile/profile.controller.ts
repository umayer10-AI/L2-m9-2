import type { Request, Response } from "express";
import { profileService } from "./profile.service.js";

const createProfile = async (req: Request, res: Response) => {
  try {
    
    const result = await profileService.createProfileIntoDB(req.body)

    // console.log(result)

    res.status(201).json({
      success: true,
      message: "User profile Create Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      data: error,
    });
  }
};


export const profileController = {
    createProfile,
}