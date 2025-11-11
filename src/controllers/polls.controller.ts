import { Request, Response } from 'express';


export const startPoll = async (req: Request, res: Response): Promise<Response> => {
  console.log("Test Successful");
  return res.status(200).json({ message: "Poll started successfully" });
};
