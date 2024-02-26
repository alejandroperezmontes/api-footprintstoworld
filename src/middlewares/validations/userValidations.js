import { check } from 'express-validator';

export const signUpOrLogInValidation = [
  check('email')
    .not()
    .isEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email is not valide')
];

export const logOutValidation = [
];
