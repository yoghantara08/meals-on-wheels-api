const Partner = require("../models/partner.model");
const Order = require("../models/order.model");

const orderStatus = require("../utils/order-status");

// GET all assigned order by admin
exports.getAssignedOrder = async (req, res, next) => {
  const partnerId = req.params.partnerId;

  try {
    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res
        .status(400)
        .json({ message: `Partner with id:${partnerId} not found!` });
    }

    const order = await Order.find({
      partner: partner._id,
      orderStatus: orderStatus.AssignPartner,
    })
      .select("-__v")
      .populate("meal", "-__v")
      .populate("member", ["-password", "-__v"]);

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT accept order and prepare meal
exports.acceptOrder = async (req, res, next) => {
  const partnerId = req.params.partnerId;
  const orderId = req.params.orderId;

  try {
    // Check if partner exist
    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res
        .status(400)
        .json({ message: `Partner with id:${partnerId} not found!` });
    }

    // Check if order exist
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(400)
        .json({ message: `Order with id:${orderId} not found!` });
    }

    // Make sure the order partner is correct partner
    if (order.partner?.toString() !== partner._id.toString()) {
      return res
        .status(401)
        .json({ message: "You don't have access to this resources" });
    }

    order.orderStatus = orderStatus.OnPrepare;
    await order.save();

    return res.status(200).json({ message: "Order accepted!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT finish preparing and ready to deliver
exports.finishPrepare = async (req, res, next) => {
  const partnerId = req.params.partnerId;
  const orderId = req.params.orderId;

  try {
    // Check if partner exist
    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res
        .status(400)
        .json({ message: `Partner with id:${partnerId} not found!` });
    }

    // Check if order exist
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(400)
        .json({ message: `Order with id:${orderId} not found!` });
    }

    // Make sure the order partner is correct partner
    if (order.partner?.toString() !== partner._id.toString()) {
      return res
        .status(401)
        .json({ message: "You don't have access to this resources" });
    }

    order.orderStatus = orderStatus.ReadyToDeliver;
    await order.save();

    return res.status(200).json({ message: "Order ready to deliver!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};
