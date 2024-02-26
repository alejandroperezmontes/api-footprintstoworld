import { Router } from 'express';

import * as FootprintController from '../controllers/footprint.controller.js';
// Middlewares
import {
  addNewFootprintValidation,
  validateFootprintByEmailsAndFootprintTypeValidation,
  requestNewFootprintValidation
} from '../middlewares/validations/footprintValidations.js';
import validateFields from '../middlewares/validateFields.js';

const router = Router();

router.post('/add', addNewFootprintValidation, validateFields, FootprintController.addNewFootprint);
router.post('/request', requestNewFootprintValidation, validateFields, FootprintController.requestNewFootrint);
router.put('/validate/id/:footprintId', FootprintController.validateFootprintById);
router.put('/validate/by-email', validateFootprintByEmailsAndFootprintTypeValidation, validateFields, FootprintController.validateFootprintByEmailsAndFootprintType);
router.get('/get-all-by-email/:email', FootprintController.getFootprintsByEmail);

export default router;
