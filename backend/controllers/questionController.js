import Question from '../models/questionModel.js';

export const createQuestion = async (req, res) => {
  const { title, body, user, group } = req.body;
  try {
    const newQuestion = new Question({ title, body, user, group });
    await newQuestion.save();
    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('user').populate('group').populate('answerscount');
    res.json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuestionsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const questions = await Question.find({ user: userId }).populate('user').populate('group').populate('answerscount');
    res.json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuestionsByGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    const questions = await Question.find({ group: groupId }).populate('user').populate('group').populate({
      path: 'answerscount',
      populate: { path: 'user' }
    });
    res.json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const upvoteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { userId } = req.body;
  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.upvotes.includes(userId)) {
      question.upvotes.pull(userId);
    } else {
      question.upvotes.push(userId);
      question.downvotes.pull(userId); 
    }

    await question.save();
    res.json({ question });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const downvoteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { userId } = req.body;
  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question.downvotes.includes(userId)) {
      question.downvotes.pull(userId);
    } else {
      question.downvotes.push(userId);
      question.upvotes.pull(userId); 
    }

    await question.save();
    res.json({ question });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
