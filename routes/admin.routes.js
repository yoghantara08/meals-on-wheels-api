const express = require("express");
const router = express.Router();

// Controller
const adminController = require("../controller/admin.controller");

// Validation
const mealValidation = require("../validation/addmealValidation");

/**
 * PATH: /api/admin
 */

// USERS MANAGEMENT
// GET all users (member/rider/volunteer)
router.get("/users", adminController.getUsers);

// GET rider/volunteer pending
router.get("/users/pending", adminController.getPendingUsers);

// PUT accept rider/volunteer
router.put("/accept-user/:userId", adminController.acceptUserRegis);

// PARTNERSHIP
// GET all partners
router.get("/partners");

// GET partners pending
router.get("/accept-partner");

// MEAL
// GET all meal
router.get("/meals");

// POST meal menu
router.post("/meal/add", mealValidation, adminController.addMeal);

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
