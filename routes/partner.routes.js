const express = require("express");
const router = express.Router();

const partnerController = require("../controller/partner.controller");

const isAuth = require("../middleware/isAuth");
const isPartner = require("../middleware/isPartner");

/**
 * PATH: /api/partner
 */

// GET all assigned order by admin
router.get(
  "/order/:partnerId",
  isAuth,
  isPartner,
  partnerController.getAssignedOrder
);

// PUT accept order and prepare meal
router.put(
  "/order/:partnerId/:orderId",
  isAuth,
  isPartner,
  partnerController.acceptOrder
);

// PUT finish preparing and ready to deliver
router.put(
  "/order-ready/:partnerId/:orderId",
  isAuth,
  isPartner,
  partnerController.finishPrepare
);

module.exports = router;
