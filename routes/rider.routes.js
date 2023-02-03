const express = require("express");
const router = express.Router();

const riderController = require("../controller/rider.controller");

const isAuth = require("../middleware/isAuth");
const isRider = require("../middleware/isRider");

/**
 * PATH: /api/rider
 */

// GET all assigned order by admin
router.get(
  "/order/:riderId",
  isAuth,
  isRider,
  riderController.getAssignedOrder
);

// PUT accept order and deliver meal
router.put(
  "/order/:riderId/:orderId",
  isAuth,
  isRider,
  riderController.acceptOrder
);

// PUT finish deliver meal
router.put(
  "/order-delivered/:riderId/:orderId",
  isAuth,
  isRider,
  riderController.orderDelivered
);

module.exports = router;
