import Answer from '../models/answerModel.js';

export const createAnswer = async (req, res) => {
  const { body, user, question, group } = req.body;
  try {
    const newAnswer = new Answer({ body, user, question, group });
    await newAnswer.save();
    res.status(201).json({  answer: newAnswer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find().populate('user').populate('question').populate('group');
    res.json(answers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAnswersByQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const answers = await Answer.find({ question: questionId }).populate('user').populate('question').populate('group');
    res.json(answers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const upvoteAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { userId } = req.body;
  try {
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    if (answer.upvotes.includes(userId)) {
      answer.upvotes.pull(userId);
    } else {
      answer.upvotes.push(userId);
      answer.downvotes.pull(userId);
    }

    await answer.save();
    res.json({ message: 'Upvote updated', answer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const downvoteAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { userId } = req.body;
  try {
    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    if (answer.downvotes.includes(userId)) {
      answer.downvotes.pull(userId);
    } else {
      answer.downvotes.push(userId);
      answer.upvotes.pull(userId); 
    }

    await answer.save();
    res.json({ message: 'Downvote updated', answer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
