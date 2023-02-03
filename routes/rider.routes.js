const express = require("express");
const router = express.Router();

const riderController = require("../controller/rider.controller");

/**
 * PATH: /api/rider
 */

// GET all assigned order by admin
router.get("/order/:riderId", riderController.getAssignedOrder);

// PUT accept order and deliver meal
router.put("/order/:riderId/:orderId", riderController.acceptOrder);

// PUT finish deliver meal
router.put(
  "/order-delivered/:riderId/:orderId",
  riderController.orderDelivered
);

module.exports = router;
