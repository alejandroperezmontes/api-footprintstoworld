import { validationResult } from 'express-validator';

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((error) => error.msg);

  return res.status(400).json({ errors: errorMessages });
};

export default validateFields;
