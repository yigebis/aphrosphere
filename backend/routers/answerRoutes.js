import express from 'express';
import {
  createAnswer,
  getAnswers,
  getAnswersByQuestion,
  upvoteAnswer,
  downvoteAnswer
} from '../controllers/answerController.js';

const router = express.Router();

router.post('/create', createAnswer);
router.get('/', getAnswers);
router.get('/question/:questionId', getAnswersByQuestion);
router.post('/:answerId/upvote', upvoteAnswer);
router.post('/:answerId/downvote', downvoteAnswer);

export default router;
