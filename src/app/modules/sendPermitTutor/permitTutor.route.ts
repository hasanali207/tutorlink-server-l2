import express from 'express';
import { permitControllers } from './permitTutor.controller';


const router = express.Router();
router.post('/create', permitControllers.createPermit)
router.get('/', permitControllers.getAllPermits)
router.get('/get-requests/:tutorId', permitControllers.getPermitsByTutorId);
router.patch('/:id', permitControllers.updatePermitByTutor);
router.get('/get/:userEmail', permitControllers.getPermitsByStudentEmail);


export const PermitRouter =router