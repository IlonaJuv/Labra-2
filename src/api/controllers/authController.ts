import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import userModel from '../models/userModel';
import {validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {LoginMessageResponse} from '../../interfaces/LoginMessageResponse';

const loginPost = async (req: Request, res: Response, next: NextFunction) => {
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
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    //401 unauthorized 403 forbidden
    if (!user) {
      next(new CustomError('Incorrect username/password', 403));
      return;
    }
    if (!(await bcrypt.compare(password, user.password))) {
      next(new CustomError('Incorrect username/password', 403));
      return;
    }
    // first is payload, second is secret, third is options
    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET as string,
      {expiresIn: '1h'}
    );

    const message: LoginMessageResponse = {
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
      token: token,
    };
    res.json(message);
  } catch (error) {
    next(new CustomError('Login failed', 500));
  }
};

export {loginPost};
