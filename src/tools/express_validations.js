import { body, param, validationResult } from 'express-validator';

export const validateTaskId = [
  param('id').isMongoId().withMessage('Invalid task ID'),
];

export const validateTaskCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
];

export const validateTaskUpdate = [
  ...validateTaskId,
  ...validateTaskCreation,
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

