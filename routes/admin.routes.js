const express = require("express");
const router = express.Router();

// Controller
const adminController = require("../controller/admin.controller");

// Validation
const mealValidation = require("../validation/addmealValidation");

// Middleware
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

/**
 * PATH: /api/admin
 */

// USERS MANAGEMENT ==================================
// GET all users (member/rider/volunteer)
router.get("/users", isAuth, isAdmin, adminController.getUsers);

// GET rider/volunteer pending
router.get("/users/pending", isAuth, isAdmin, adminController.getPendingUsers);

// PUT accept rider/volunteer
router.put(
  "/accept-user/:userId",
  isAuth,
  isAdmin,
  adminController.acceptUserRegis
);

// PARTNERSHIP ==================================
// GET all partners
router.get("/partners", isAuth, isAdmin, adminController.getPartners);

// GET partners pending
router.get(
  "/partners/pending",
  isAuth,
  isAdmin,
  adminController.getPendingPartners
);

// PUT accept partner
router.put(
  "/accept-partner/:partnerId",
  isAuth,
  isAdmin,
  adminController.acceptPartnerRegis
);

// MEAL ==================================
// GET all meal
router.get("/meals", isAuth, isAdmin, adminController.getMeals);

// POST meal menu
router.post(
  "/meal/add",
  isAuth,
  isAdmin,
  mealValidation,
  adminController.addMeal
);

// PUT edit meal
router.put("/meal/edit/:mealId", isAuth, isAdmin, adminController.editMeal);

// DELETE meal
router.delete(
  "/meal/delete/:mealId",
  isAuth,
  isAdmin,
  adminController.deleteMeal
);

// ORDER ==================================
// GET all on progress order
router.get(
  "/order-on-progress",
  isAuth,
  isAdmin,
  adminController.getOnProgressOrder
);

// GET all completed order
router.get(
  "/order-complete",
  isAuth,
  isAdmin,
  adminController.getCompletedOrder
);

// PUT assign order to partner
router.put(
  "/assign-to-partner/:orderId/:partnerId",
  isAuth,
  isAdmin,
  adminController.assignOrderToPartner
);

// PUT assigned meal to rider
router.put(
  "/assign-to-rider/:orderId/:riderId",
  isAuth,
  isAdmin,
  adminController.assignOrderToRider
);

module.exports = router;
