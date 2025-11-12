import { createPoll } from '../data/poll.repository';
import { CreatePollRequest, CreatePollResponse } from '../types/poll.types';

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
