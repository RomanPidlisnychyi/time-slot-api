const { Router } = require('express');
const {
  register,
  login,
  authorized,
  current,
  getTimeslot,
  updateTimeslot,
} = require('../controllers/userController');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const {
  registerValidation,
  updateSlotValidation,
} = require('../helpers/validation');

const userRouter = Router();

userRouter.post('/auth/register', registerValidation, asyncWrapper(register));
userRouter.post('/auth/login', registerValidation, asyncWrapper(login));
userRouter.get(
  '/users/current',
  asyncWrapper(authorized),
  asyncWrapper(current)
);
userRouter.get(
  '/users/timeslot',
  asyncWrapper(authorized),
  asyncWrapper(getTimeslot)
);

userRouter.post(
  '/users/timeslot',
  updateSlotValidation,
  asyncWrapper(authorized),
  asyncWrapper(updateTimeslot)
);

module.exports = userRouter;
