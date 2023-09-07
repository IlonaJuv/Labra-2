// TODO: Schema for animal model
import {Schema, model} from 'mongoose';
import {Animal} from '../../interfaces/Animal';

// Schema for animal model
// based on the Animal interface located at: src/interfaces/Animal.ts¨

const AnimalSchema = new Schema({
  animal_name: {
    type: String,
    required: true,
    unique: false,
    minlength: 2,
  },
  species: {
    type: Schema.Types.ObjectId,
    ref: 'Species',
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
    max: Date.now(),
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
});

export default model<Animal>('Animal', AnimalSchema);
