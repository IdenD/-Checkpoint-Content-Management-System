const express = require("express");
const {
  userCreate,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/user", userCreate);
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/update/user/:id", updateUser);
router.delete("/delete/user/:id", deleteUser);

module.exports = router;
