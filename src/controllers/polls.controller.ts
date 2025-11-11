import { Request, Response } from 'express';


export const savePoll = async (req: Request, res: Response): Promise<Response> => {
  console.log("Test Successful");
  return res.status(201).json({ status:true,code: "success", message: "Poll started successfully" });
};


export const getPollById = async (req: Request, res: Response): Promise<Response> => {
  console.log("Test Successful");
  return res.status(200).json({ status:true, code: "success", message: "Poll get successfully" });
};


export const savePollById = async (req: Request, res: Response): Promise<Response> => {
  console.log("Test Successful");
  return res.status(200).json({ status:true, code: "success", message: "Poll started successfully" });
};
