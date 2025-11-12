import { pool } from '../config/database';
import { CreatePollRequest, PollDB, PollOptionDB } from '../types/poll.types';

export const createPoll = async (
  pollData: CreatePollRequest
): Promise<{ poll: PollDB; options: PollOptionDB[] }> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const pollResult = await client.query<PollDB>(
      `INSERT INTO polls (title) 
       VALUES ($1) 
       RETURNING id, title, created_at`,
      [pollData.title]
    );

    const poll = pollResult.rows[0];

    const optionPromises = pollData.options.map((option, index) =>
      client.query<PollOptionDB>(
        `INSERT INTO poll_options (poll_id, label, position) 
         VALUES ($1, $2, $3) 
         RETURNING id, poll_id, label, position, created_at`,
        [poll.id, option.label, option.position || index + 1]
      )
    );

    const optionResults = await Promise.all(optionPromises);
    const options = optionResults.map((result) => result.rows[0]);

    await client.query('COMMIT');

    return { poll, options };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
