import express from 'express';
import {
  createQuestion,
  getQuestions,
  getQuestionsByUser,
  getQuestionsByGroup,
  upvoteQuestion,
  downvoteQuestion
} from '../controllers/questionController.js';

const router = express.Router();

router.post('/create', createQuestion);
router.get('/', getQuestions);
router.get('/user/:userId', getQuestionsByUser);
router.get('/group/:groupId', getQuestionsByGroup);
router.post('/:questionId/upvote', upvoteQuestion);
router.post('/:questionId/downvote', downvoteQuestion);

export default router;
