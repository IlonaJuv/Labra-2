import express, {Request, Response} from 'express';

import categoryRoute from './routes/categoryRoute';
import authRoute from './routes/authRoute';
import animalRoute from './routes/animalRoute';
import speciesRoute from './routes/speciesRoute';
import userRoute from './routes/userRoute';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'animals api v1',
  });
});

router.use('/categories', categoryRoute);

router.use('/species', speciesRoute);
router.use('/animals', animalRoute);
router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;
