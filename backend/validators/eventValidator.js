import { check } from 'express-validator';

const eventValidator = () => {
  return [
    check('name')
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .trim()
      .withMessage('Event name must be between 2 and 50 characters'),

    check('description')
      .notEmpty()
      .escape()
      .isLength({ min: 200, max: 1000 })
      .trim()
      .withMessage('Event description must be between 200 and 1000 characters'),

    check('category')
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .trim()
      .withMessage('Name must be between 2 and 50 characters'),

    check('startDate')
      .toDate()
      .isDate()
      .exists()
      .notEmpty()
      .withMessage('Start date cannot be empty')
      .isISO8601('yyyy-mm-dd')
      .matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
      .withMessage('Start date must be in correct format yyyy:mm:dd hh:mm:ss'),

    check('endDate')
      .toDate()
      .isDate()
      .exists()
      .notEmpty()
      .withMessage('End date cannot be empty')
      .isISO8601('yyyy-mm-dd')
      .matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
      .withMessage('End date must be in correct format yyyy:mm:dd hh:mm:ss'),

    check('originalPrice')
      .notEmpty()
      .isNumeric()
      .isFloat({ min: 50, max: 1500 })
      .trim()
      .escape()
      .withMessage('Original price must be between 50 and 1500!'),

    check('discountPrice')
      .notEmpty()
      .isNumeric()
      .isFloat({ min: 50, max: 1000 })
      .trim()
      .escape()
      .withMessage('Discounted price must be between 50 and 1000!'),

    check('stock')
      .notEmpty()
      .isNumeric()
      .isFloat({ min: 1, max: 50 })
      .trim()
      .escape()
      .withMessage('Stack must be between 1 and 50!'),

    check('image').notEmpty(),
  ];
};

export default eventValidator;
