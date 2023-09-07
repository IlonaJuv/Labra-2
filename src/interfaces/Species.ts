// TODO: interface for Species

import {Point} from 'geojson';
import {Document, Types} from 'mongoose';

interface Species extends Document {
  species_name: string;
  category: Types.ObjectId;
  image: string;
  loction: Point;
}

interface SpeciesInput {
  species_name: string;
  category: Types.ObjectId;
  image: string;
  loction: Point;
}

export {Species, SpeciesInput};
