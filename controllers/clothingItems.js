const ClothingItem = require("../models/ClothingItem");
const handleControllerError = require("../utils/handleControllerError");
const { NotFoundError, ForbiddenError } = require("../errors");

const getItems = (req, res, next) =>
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((error) => next(handleControllerError(error, "item")));

const createClothingItem = (req, res, next) =>
  ClothingItem.create({
    name: req.body.name,
    weather: req.body.weather,
    imageUrl: req.body.imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((error) => next(handleControllerError(error, "item")));

const deleteClothingItem = (req, res, next) =>
  ClothingItem.findById(req.params.itemId)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You cannot delete another user's item");
      }
      return item.deleteOne().then(() => res.send(item));
    })
    .catch((error) => next(handleControllerError(error, "item")));

const likeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.send(item))
    .catch((error) => next(handleControllerError(error, "item")));

const dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.send(item))
    .catch((error) => next(handleControllerError(error, "item")));

module.exports = {
  getItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
