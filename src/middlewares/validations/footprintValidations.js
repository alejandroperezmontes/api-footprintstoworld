import { check } from 'express-validator';

export const validateFootprintByEmailsAndFootprintTypeValidation = [
  check('gift')
    .not()
    .isEmpty()
    .withMessage('id_user_receiver is required'),
  check('status')
    .not()
    .isEmpty()
    .withMessage('status is required')
    .isIn([0, 1])
    .withMessage('Status must be either 0 or 1'),
  check('id_user_receiver')
    .not()
    .isEmpty()
    .withMessage('id_user_receiver is required'),
  check('email_user_giver')
    .not()
    .isEmpty()
    .withMessage('email_user_giver is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('email_user_receiver')
    .not()
    .isEmpty()
    .withMessage('email_user_receiver is required')
    .isEmail()
    .withMessage('Invalid email address')
];

export const requestNewFootprintValidation = [
  check('status')
    .not()
    .isEmpty()
    .withMessage('status is required')
    .isIn([0, 2])
    .withMessage('Status must be either 0 or 2'),
  check('id_user_receiver')
    .not()
    .isEmpty()
    .withMessage('id_user_receiver is required'),
  check('email_user_giver')
    .not()
    .isEmpty()
    .withMessage('email_user_giver is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('email_user_receiver')
    .not()
    .isEmpty()
    .withMessage('email_user_receiver is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('gift')
    .not()
    .isEmpty()
    .withMessage('Gift is required')
    .isNumeric()
    .withMessage('Gift must be a integer')
];

export const addNewFootprintValidation = [
  check('status')
    .not()
    .isEmpty()
    .withMessage('status is required')
    .isIn([0, 1])
    .withMessage('Status must be either 0 or 1'),
  check('id_user_giver')
    .not()
    .isEmpty()
    .withMessage('id_user_giver is required'),
  check('email_user_giver')
    .not()
    .isEmpty()
    .withMessage('email_user_giver is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('email_user_receiver')
    .not()
    .isEmpty()
    .withMessage('email_user_receiver is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('gift')
    .not()
    .isEmpty()
    .withMessage('Gift is required')
    .isNumeric()
    .withMessage('Gift must be a integer')
];
