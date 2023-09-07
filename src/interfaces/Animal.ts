import {Document, Types} from 'mongoose';

interface Animal extends Document {
  animal_name: string;
  birthdate: string;
  species: Types.ObjectId;
  gender: 'Male' | 'Female';
}

export {Animal};
