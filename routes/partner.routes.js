const express = require("express");
const router = express.Router();

const partnerController = require("../controller/partner.controller");

/**
 * PATH: /api/partner
 */

// GET all assigned order by admin
router.get("/order/:partnerId", partnerController.getAssignedOrder);

// PUT accept order and prepare meal
router.put("/order/:partnerId/:orderId", partnerController.acceptOrder);

// PUT finish preparing and ready to deliver
router.put("/order-ready/:partnerId/:orderId", partnerController.finishPrepare);

module.exports = router;
