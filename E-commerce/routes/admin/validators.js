const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
  requireTitle: check('title').trim()
  .isLength({min:4, max:40})
  .withMessage('Must be between 4 and 40 characters'),
  //// whenever we submit the form no matter what we type our server always gonna recieve this value as a string & next step is valodation whether we get the float number from previous step or not and it should be of 1 length.
  requirePrice: check('price').trim().toFloat().isFloat({min:1})
  .withMessage('Must be number greater than 1'),    
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async email => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email in use');
      }
    }),
  requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .custom((passwordConfirmation, { req }) => {
        const { password } = req.body;

        if (passwordConfirmation.trim() !== password.trim()) {
            console.log('Passwords do not match');
            throw new Error('Passwords must match');
        }

        return true;
    }),
  requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async email => {
      const user = await usersRepo.getOneBy({ email });
      if (!user) {
        throw new Error('Email not found!');
      }
    }),
  requireValidPasswordForUser: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error('Invalid password');
      }

      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error('Invalid password');
      }
    })
};
