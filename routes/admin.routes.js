const express = require("express");
const router = express.Router();

/**
 * PATH: /api/admin
 */

// USERS MANAGEMENT
// GET all users (member/rider/volunteer)
router.get("/users");

// GET rider/volunteer pending
router.get("/accept-user");

// PARTNERSHIP
// GET all partners
router.get("/partners");

// GET partners pending
router.get("/accept-partner");

// MEAL
// GET all meal
router.get("/meals");

// POST meal menu
router.post("/meal/add");

// PUT edit meal
router.put("/meal/edit/:mealId");

// ORDER
// GET all order pending
router.get("/order/pending");

// PUT meal to partner
router.put("/order/assign-partner");

// GET all order prepared
router.get("/order/prepared");

// GET all order ready to deliver
router.get("/order/ready-to-deliver");

// PUT meal to driver
router.put("/order/assign-rider");

// GET all order on delivery
router.get("/order/on-delivery");

// GET all order delivered/complete
router.get("/order/complete");

module.exports = router;
