import { Router } from 'express';
import { startPoll } from '../controllers/polls.controller';

const router = Router();

router.post('/start', startPoll);

export default router;