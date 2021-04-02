const Joi = require('joi');
const ErrorConstructor = require('./ErrorConstructor');

module.exports.registerValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
  }).required();

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return next(new ErrorConstructor(400));
  }

  next();
};
