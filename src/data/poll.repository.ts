import { pool } from '../config/database';
import { CreatePollRequest, PollDB, PollOptionDB, PollOptionWithVotes } from '../types/poll.types';

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

export const getPollById = async ( pollId: string ): Promise<{ poll: PollDB; options: PollOptionWithVotes[] } | null> => {
  const client = await pool.connect();

  try {
    const pollResult = await client.query<PollDB>(
      `SELECT id, title, created_at 
       FROM polls 
       WHERE id = $1`,
      [pollId]
    );

    if (pollResult.rows.length === 0) {
      return null;
    }

    const poll = pollResult.rows[0];

    const optionsResult = await client.query<PollOptionWithVotes>(
      `SELECT 
        po.id,
        po.label,
        po.position,
        COUNT(v.id)::int AS votes
      FROM poll_options po
      LEFT JOIN votes v ON v.option_id = po.id
      WHERE po.poll_id = $1
      GROUP BY po.id, po.label, po.position
      ORDER BY po.position ASC`,
      [pollId]
    );

    const options = optionsResult.rows;

    return { poll, options };
  } finally {
    client.release();
  }
};
