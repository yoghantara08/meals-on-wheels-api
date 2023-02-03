const express = require("express");
const router = express.Router();

const memberController = require("../controller/member.controller");

/**
 * PATH: /api/member
 */

// POST order meal :mealId
router.post("/order/:mealId/:memberId", memberController.orderMeal);

// GET list on order meal :status on progress
router.get("/order/:memberId", memberController.getMemberOrder);

// GET all complete ordered meals :status = "MEAL DELIVERED"
router.get("/order-complete/:memberId", memberController.getCompleteOrder);

module.exports = router;
