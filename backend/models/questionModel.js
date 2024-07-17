import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  downvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  answerscount: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  createdat: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
