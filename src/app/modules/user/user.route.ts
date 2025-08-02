import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();
router.get('/', userControllers.getAllUsers);
router.get('/tutors', userControllers.getAllTutors);
router.get('/tutors/:id', userControllers.getTutorById);
router.get('/:id', userControllers.getSingleUser);
router.patch('/:email', userControllers.updateUser);

export const UserRoutes = router;
