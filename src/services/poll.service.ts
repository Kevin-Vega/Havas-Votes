import { createPoll, getPollById, verifyPollExists, verifyOptionBelongsToPoll, createVote } from '../data/poll.repository';
import { CreatePollRequest, CreatePollResponse, GetPollByIdResponse, VoteRequest, VoteResponse } from '../types/poll.types';

export const createNewPoll = async (
  pollData: CreatePollRequest
): Promise<CreatePollResponse> => {

  if (!pollData.title || pollData.title.trim().length < 3) {
    throw new Error('The title must be at least 3 characters long');
  }

  if (pollData.title.trim().length > 200) {
    throw new Error('The title cannot exceed 200 characters');
  }

  if (!pollData.options || pollData.options.length < 2) {
    throw new Error('At least 2 options must be provided');
  }

  pollData.options.forEach((option, index) => {
    if (!option.label || option.label.trim().length < 1) {
      throw new Error(`The option ${index + 1} must have at least 1 character`);
    }

    if (option.label.trim().length > 120) {
      throw new Error(`The option ${index + 1} exceeds the limit of 120 characters`);
    }
  });

  const { poll, options } = await createPoll(pollData);

  return {
    id: poll.id,
    title: poll.title,
    options,
    created_at: poll.created_at,
  };
};

export const getPollDetailsById = async (pollId: string ): Promise<GetPollByIdResponse> => {

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(pollId)) {
    throw new Error('Invalid poll ID format');
  }

  const result = await getPollById(pollId);

  if (!result) {
    throw new Error('Poll not found');
  }

  const { poll, options } = result;

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return {
    id: poll.id,
    title: poll.title,
    options,
    created_at: poll.created_at,
    total_votes: totalVotes,
  };
};

export const registerVote = async (
  pollId: string,
  voteData: VoteRequest ): Promise<VoteResponse> => {

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(pollId)) {
    throw new Error('Invalid poll ID format');
  }

  if (!uuidRegex.test(voteData.option_id)) {
    throw new Error('Invalid option ID format');
  }

  const pollExists = await verifyPollExists(pollId);
  if (!pollExists) {
    throw new Error('Poll not found');
  }

  const optionBelongsToPoll = await verifyOptionBelongsToPoll(voteData.option_id, pollId);
  if (!optionBelongsToPoll) {
    throw new Error('Option does not belong to this poll');
  }

  const vote = await createVote(pollId, voteData);

  return {
    id: vote.id,
    poll_id: vote.poll_id,
    option_id: vote.option_id,
    created_at: vote.created_at,
    message: 'Vote registered successfully',
  };
};
