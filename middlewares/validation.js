const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const name = Joi.string().min(2).max(30).required();
const credentials = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
};
const objectId = Joi.string().hex().length(24).required();

const requiredUrl = (field) =>
  Joi.string()
    .required()
    .custom(validateURL)
    .messages({
      "string.empty": `The "${field}" field must be filled in`,
      "string.uri": `The "${field}" field must be a valid URL`,
    });

const validateCardBody = celebrate({
  body: Joi.object({
    name,
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: requiredUrl("imageUrl"),
  }).required(),
});

const validateSignup = celebrate({
  body: Joi.object({
    ...credentials,
    name,
    avatar: requiredUrl("avatar"),
  }).required(),
});

const validateSignin = celebrate({
  body: Joi.object(credentials).required(),
});

const validateId = celebrate({
  params: Joi.object({ itemId: objectId }).required(),
});

module.exports = {
  objectId,
  validateCardBody,
  validateSignup,
  validateSignin,
  validateId,
};
