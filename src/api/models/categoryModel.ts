// Schema for category model
import {Schema, model} from 'mongoose';
import {Category} from '../../interfaces/Category';

// Schema for category model
// based on the Category interface located at: src/interfaces/Category.ts

const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
});

export default model<Category>('Category', CategorySchema);
