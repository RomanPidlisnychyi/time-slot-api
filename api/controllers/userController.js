const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const slotModel = require('../models/slotModel');
const ErrorConstructor = require('../helpers/ErrorConstructor');
const { createUserSlots } = require('../helpers/createUserSlots');

const salt = bcrypt.genSaltSync(10);

module.exports.register = async (req, res, next) => {
  const { name, password } = req.body;

  const hash = bcrypt.hashSync(password, salt);

  const user = await userModel.create({ ...req.body, password: hash });

  const userSlots = createUserSlots(user._id);
  await slotModel.create(userSlots);

  res.status(201).json({ name });
};

module.exports.login = async (req, res, next) => {
  const { name, password } = req.body;

  const user = await userModel.findOne({ name });
  if (!user) {
    return next(new ErrorConstructor(401));
  }

  const isPassValid = bcrypt.compareSync(password, user.password);
  if (!isPassValid) {
    return next(new ErrorConstructor(401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  res.status(200).json({ name, token });
};

module.exports.authorized = async (req, res, next) => {
  const authorization = req.headers.authorization;

  const token = authorization.split(' ')[1];

  let userId;

  try {
    userId = jwt.verify(token, process.env.JWT_SECRET).id;
  } catch (err) {
    return next(new ErrorConstructor(401));
  }

  const user = await userModel.findById(userId);

  req.user = user;

  next();
};

module.exports.current = async (req, res, next) => {
  const { name } = req.user;

  res.status(200).json({ name });
};

module.exports.getTimeslot = async (req, res, next) => {
  const { _id: userId } = req.user;

  const userSlots = await slotModel.findOne({ userId });
  const { slots } = userSlots;

  res.status(200).json(slots);
};

module.exports.updateTimeslot = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { slots } = req.body;

  const userSlots = await slotModel.findOneAndUpdate(
    { userId },
    { slots },
    {
      new: true,
    }
  );
  const { slots: updatedSlots } = userSlots;

  res.status(200).json({ slots: updatedSlots });
};
