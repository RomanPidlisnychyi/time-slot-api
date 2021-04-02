const { Router } = require('express');
const {
  register,
  login,
  authorized,
  current,
} = require('../controllers/userController');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const { registerValidation } = require('../helpers/validation');

const userRouter = Router();

userRouter.post('/auth/register', registerValidation, asyncWrapper(register));
userRouter.post('/auth/login', registerValidation, asyncWrapper(login));
userRouter.get(
  '/users/current',
  asyncWrapper(authorized),
  asyncWrapper(current)
);

module.exports = userRouter;
