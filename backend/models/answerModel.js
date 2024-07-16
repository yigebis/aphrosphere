import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true},
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  downvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  createdat: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
