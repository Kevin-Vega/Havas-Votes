export interface PollOption {
  label: string;
  position: number;
}

export interface CreatePollRequest {
  title: string;
  options: PollOption[];
}

export interface PollOptionDB {
  id: string;
  poll_id: string;
  label: string;
  position: number;
  created_at: Date;
}

export interface PollDB {
  id: string;
  title: string;
  created_at: Date;
}

export interface CreatePollResponse {
  id: string;
  title: string;
  options: PollOptionDB[];
  created_at: Date;
}

export interface PollOptionWithVotes {
  id: string;
  label: string;
  position: number;
  votes: number;
}

export interface GetPollByIdResponse {
  id: string;
  title: string;
  options: PollOptionWithVotes[];
  created_at: Date;
  total_votes: number;
}

export interface VoteRequest {
  option_id: string;
}

export interface VoteDB {
  id: number;
  poll_id: string;
  option_id: string;
  created_at: Date;
}
  
export interface VoteResponse {
  id: number;
  poll_id: string;
  option_id: string;
  created_at: Date;
  message: string;
}
