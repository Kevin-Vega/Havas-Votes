import { Request, Response } from 'express';
import { createNewPoll } from '../services/poll.service';
import { CreatePollRequest } from '../types/poll.types';

export const savePoll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pollData: CreatePollRequest = req.body;

    const poll = await createNewPoll(pollData);

    return res.status(201).json({
      status: true,
      code: 'success',
      message: 'Poll created successfully',
      data: poll,
    });
  } catch (error) {
    console.error('Error creating poll:', error);

    if (error instanceof Error) {
      return res.status(400).json({
        status: false,
        code: 'error',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: false,
      code: 'error',
      message: 'Internal server error',
    });
  }
};


export const getPollById = async (req: Request, res: Response): Promise<Response> => {
  console.log("Test Successful");
  return res.status(200).json({ status:true, code: "success", message: "Poll get successfully" });
};


export const savePollById = async (req: Request, res: Response): Promise<Response> => {
  console.log("Test Successful");
  return res.status(200).json({ status:true, code: "success", message: "Poll started successfully" });
};
