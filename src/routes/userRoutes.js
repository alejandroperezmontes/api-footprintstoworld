import { Router } from 'express';

// Controllers
import * as AuthController from '../controllers/user.controller.js';

// Middlewares
import { signUpOrLogInValidation, logOutValidation } from '../middlewares/validations/userValidations.js';
import validateFields from '../middlewares/validateFields.js';

const router = Router();

router.post('/log-in', signUpOrLogInValidation, validateFields, AuthController.signUpOrLogIn);
router.get('/log-in/verify-token', AuthController.verifyTokenToLogin);
router.post('/log-out', logOutValidation, validateFields, AuthController.logOut);

export default router;
