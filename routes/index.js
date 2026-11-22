const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { validateSignup, validateSignin } = require("../middlewares/validation");
const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const { NotFoundError } = require("../errors");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.get("/items", getItems);
router.use("/users", auth, usersRouter);
router.use("/items", auth, clothingItemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
