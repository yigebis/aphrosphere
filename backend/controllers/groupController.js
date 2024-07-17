import Group from '../models/groupModel.js';

export const createGroup = async (req, res) => {
  const { name, description, mentors, members } = req.body;
  try {
    const newGroup = new Group({ name, description, mentors, members });
    await newGroup.save();
    res.status(201).json({ message: 'Group created successfully', group: newGroup });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('mentor members');
    res.json(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOneGroup = async (req, res) => {
  try {
    const {groupId} = req.params
    const group = await Group.findById( groupId ).populate('mentor members');
    res.json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
