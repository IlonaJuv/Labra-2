import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import userModel from '../models/userModel';
import {validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

const userPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      next(new CustomError(messages, 400));
      return;
    }
    const user = req.body;
    // 12 is solverounds
    user.password = await bcrypt.hash(user.password, 12);
    user.role = 'user';

    const newUser = await userModel.create(user);
    const response: DBMessageResponse = {
      message: 'User created',
      data: {username: newUser.username, email: newUser.email, id: newUser._id},
    };
    res.json(response);
  } catch (error) {
    next(new CustomError('User creation failed', 500));
  }
};

export {userPost};
