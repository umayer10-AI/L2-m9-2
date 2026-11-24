import type { Request, Response } from "express";
import { pool } from "../../db/index.js";
import { userService } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
  try {
    
    const result = await userService.createUserIntoDB(req.body)

    // console.log(result)

    res.status(201).json({
      success: true,
      message: "User Create Successfully",
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

const getUser = async (req: Request, res: Response) => {

    // console.log(req.user)

    try {

        const result = await userService.getUserDB()

        // console.log(result)

        res.status(201).json({
            success: true,
            message: "User Create Successfully",
            data: result.rows
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

const singleGetUser = async (req: Request, res: Response) => {

    try {

        const result = await userService.singleGetUserDB(req.params)

        // console.log(result)

        res.status(201).json({
            success: true,
            message: "User Create Successfully",
            data: result.rows[0]
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {

        const result = await userService.updateUserIntoDB(req)

        // console.log(result)

        res.status(201).json({
            success: true,
            message: "User Updated Successfully",
            data: result.rows[0],
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {

        const {id} = req.params

        const result = await userService.deleteUserIntoDB(id)

        // console.log(result)

        res.status(201).json({
            success: true,
            message: "User Deleted Successfully",
            data: result.rows[0],
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error
        })
    }
}

export const userController = {
  createUser,
  getUser,
  singleGetUser,
  updateUser,
  deleteUser
};
