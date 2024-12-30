import { body, param, validationResult } from 'express-validator';

export const validateTaskId = [
  param('id').isMongoId().withMessage('Invalid task ID'),
];

export const validateTaskCreation = [
  body('title')
  .notEmpty()
  .withMessage('Title is required'),
  body('description')
  .optional() 
  .notEmpty()
  .withMessage('Description is optionals'),
  body('completed')
  .isBoolean()
  .withMessage('Completed must be a boolean'),
];

export const validateTaskUpdate = [
  validateTaskId[0],
  body('title')
    .optional() 
    .notEmpty()
    .withMessage('Title cannot be empty'),
  body('description')
    .optional() 
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('completed')
    .optional() 
    .isBoolean()
    .withMessage('Completed must be a boolean'),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


