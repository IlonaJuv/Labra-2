// TODO: Controller for the Category model
// 1. Create function to get all categories
// 2. Create function to get category by id
// 3. Create function to create category
// 4. create function to update category
// 5. create function to delete category

import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import CategoryModel from '../models/categoryModel';
import DBMessageResponse from '../../interfaces/DBMessageResponse';
import {Category} from '../../interfaces/Category';
import {validationResult} from 'express-validator';

const categoryListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // userissa kotitehtävässä - "password, - role"
    const categories = await CategoryModel.find().select('-__v');
    if (!categories || categories.length === 0) {
      next(new CustomError('Category not found', 404));
      // stop the execution of this function and dont go to next line res.json(categories);
      return;
    }
    res.json(categories);
  } catch (err) {
    next(new CustomError('Something went wrong with the server', 500));
  }
};

// mongosta id tulee stringinä
const categoryGetById = async (
  req: Request<{id: string}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages2 = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');

      next(new CustomError(messages2, 400));
      return;
    }

    const category = await CategoryModel.findById(req.params.id).select('-__v');
    if (!category) {
      next(new CustomError('Category not found', 404));
      return;
    }
    res.json(category);
  } catch (err) {
    next(new CustomError('Something went wrong with the server', 500));
  }
};

const categoryPost = async (
  req: Request<{}, {}, Category>,
  res: Response,
  next: NextFunction
) => {
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
    // save - make na new object withh type Document, and categoryModel is type Model, two line code
    const newCategory = new CategoryModel(req.body);
    const savedCategory = await newCategory.save();
    // create - make a new object with type Model, single line code
    /* const cat = await categoryModel.create(req.body); */
    const output: DBMessageResponse = {
      message: 'Category created',
      data: savedCategory,
    };
    res.status(201).json(output);
  } catch (err) {
    next(err);
  }
};

const categoryPut = async (
  req: Request<{id: string}, {}, Category>,
  res: Response,
  next: NextFunction
) => {
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

    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).select('-__v');
    if (!category) {
      next(new CustomError('Category not found', 404));
      return;
    }
    const output: DBMessageResponse = {
      message: 'Category updated',
      data: category,
    };
    res.json(output);
  } catch (err) {
    next(err);
  }
};

const categoryDelete = async (
  req: Request<{id: string}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
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

    const category = await CategoryModel.findByIdAndDelete(
      req.params.id
    ).select('-__v');
    if (!category) {
      next(new CustomError('Category not found', 404));
      return;
    }
    const output: DBMessageResponse = {
      message: 'Category deleted',
      data: category,
    };
    res.json(output);
  } catch (err) {
    next(err);
  }
};

export {
  categoryListGet,
  categoryGetById,
  categoryPost,
  categoryPut,
  categoryDelete,
};
