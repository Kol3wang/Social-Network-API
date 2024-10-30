import { Router } from 'express';
import userRouter from './api/userRoutes'; // Adjust the imports if necessary
import thoughtRouter from './api/thoughtRoutes';

const router = Router();

router.use('/users', userRouter); // Routes accessible at /api/users
router.use('/thoughts', thoughtRouter); // Routes accessible at /api/thoughts

export default router;