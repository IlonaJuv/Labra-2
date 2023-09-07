import {Schema, model} from 'mongoose';
import {Species} from '../../interfaces/Species';

// Schema for species model
// based on the Species interface located at: src/interfaces/Species.ts

const SpeciesSchema = new Schema({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export default model<Species>('Species', SpeciesSchema);
