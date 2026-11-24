import type { NextFunction, Request, Response } from "express";
import fs from 'fs'

export const logger = async (req: Request, res: Response, next: NextFunction) => {
//   console.log('Time:', Date.now());

const log = `\nMethod: ${req.method} | URL ${req.url} | Time: ${Date.now()}`

// fs.appendFile("logger.txt", log, (err) => {
//     console.log(err)
// })

  next();
}