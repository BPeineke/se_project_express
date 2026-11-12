const ClothingItem = require('../models/ClothingItem');
const handleControllerError = require('../utils/handleControllerError');
const { NOT_FOUND } = require('../utils/errors');

const getItems = (req, res) => ClothingItem.find({})
  .then((items) => res.send(items))
  .catch((error) => handleControllerError(res, error, 'item'));

const createClothingItem = (req, res) => ClothingItem.create({
  name: req.body.name,
  weather: req.body.weather,
  imageUrl: req.body.imageUrl,
  owner: req.user._id,
})
  .then((item) => res.status(201).send(item))
  .catch((error) => handleControllerError(res, error, 'item'));

const deleteClothingItem = (req, res) => ClothingItem.findByIdAndDelete(req.params.itemId)
  .orFail(() => {
    const error = new Error('Item not found');
    error.statusCode = NOT_FOUND;
    throw error;
  })
  .then((item) => res.send(item))
  .catch((error) => handleControllerError(res, error, 'item'));

const likeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    const error = new Error('Item not found');
    error.statusCode = NOT_FOUND;
    throw error;
  })
  .then((item) => res.send(item))
  .catch((error) => handleControllerError(res, error, 'item'));

const dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    const error = new Error('Item not found');
    error.statusCode = NOT_FOUND;
    throw error;
  })
  .then((item) => res.send(item))
  .catch((error) => handleControllerError(res, error, 'item'));

module.exports = {
  getItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};

