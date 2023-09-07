// TODO: route for species
import express from 'express';

import {param, body} from 'express-validator';

import {
  speciesDelete,
  speciesGet,
  speciesListGet,
  speciesPost,
  speciesPut,
} from '../controllers/speciesController';

const router = express.Router();

router
  .route('/')
  .get(speciesListGet)
  .post(
    body('species_name').notEmpty().isString().escape(),
    body('category').isMongoId(),
    body('image').notEmpty().isString().escape(),
    body('location').notEmpty().isObject(),
    speciesPost
  );

router
  .route('/:id')
  .get(param('id').isMongoId(), speciesGet)
  .put(
    param('id').isMongoId(),
    body('species_name').isString().escape().optional(),
    body('category').isMongoId().optional(),
    body('image').isString().escape().optional(),
    body('location').notEmpty().isObject().optional(),
    speciesPut
  )
  .delete(param('id').isMongoId(), speciesDelete);

export default router;
