import { Request, Response } from 'express';
import { createNewPoll, getPollDetailsById, registerVote } from '../services/poll.service';
import { CreatePollRequest, VoteRequest } from '../types/poll.types';

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
  try {
    const { id } = req.params;

    const poll = await getPollDetailsById(id);

    return res.status(200).json({
      status: true,
      code: 'success',
      message: 'Poll retrieved successfully',
      data: poll,
    });
  } catch (error) {
    console.error('Error retrieving poll:', error);

    if (error instanceof Error) {
      const statusCode = error.message === 'Poll not found' ? 404 : 400;
      return res.status(statusCode).json({
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

export const savePollById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const voteData: VoteRequest = req.body;

    const vote = await registerVote(id, voteData);

    return res.status(201).json({
      status: true,
      code: 'success',
      message: vote.message,
      data: {
        id: vote.id,
        poll_id: vote.poll_id,
        option_id: vote.option_id,
        created_at: vote.created_at,
      },
    });
  } catch (error) {
    console.error('Error registering vote:', error);

    if (error instanceof Error) {
      let statusCode = 400;
      if (error.message === 'Poll not found') {
        statusCode = 404;
      } else if (error.message === 'Option does not belong to this poll') {
        statusCode = 400;
      }

      return res.status(statusCode).json({
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
