const express = require("express");
const router = express.Router();

const memberController = require("../controller/member.controller");

const isAuth = require("../middleware/isAuth");
const isMember = require("../middleware/isMember");

/**
 * PATH: /api/member
 */

// POST order meal :mealId
router.post(
  "/order/:mealId/:memberId",
  isAuth,
  isMember,
  memberController.orderMeal
);

// GET list on order meal :status on progress
router.get(
  "/order/:memberId",
  isAuth,
  isMember,
  memberController.getMemberOrder
);

// GET all complete ordered meals :status = "MEAL DELIVERED"
router.get(
  "/order-complete/:memberId",
  isAuth,
  isMember,
  memberController.getCompleteOrder
);

module.exports = router;
