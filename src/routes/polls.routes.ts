import { Router } from 'express';
import { savePoll,getPollById,savePollById } from '../controllers/polls.controller';

const router = Router();

router.post('/polls', savePoll);

router.get('/polls/:id', getPollById);

router.post('/polls/:id', savePollById);

export default router;