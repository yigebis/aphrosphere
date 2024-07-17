import express from 'express';
import { createGroup, getGroups, getOneGroup } from '../controllers/groupController.js';

const groupRouter = express.Router();

groupRouter.post('/create', createGroup);
groupRouter.get('/', getGroups);
groupRouter.get('/:groupId', getOneGroup);

export default groupRouter;
