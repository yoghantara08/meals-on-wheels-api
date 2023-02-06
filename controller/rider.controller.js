const User = require("../models/users.model");
const Order = require("../models/order.model");

const orderStatus = require("../utils/order-status");

// GET all assigned order by admin
exports.getAssignedOrder = async (req, res, next) => {
  const riderId = req.params.riderId;

  try {
    const rider = await User.findById(riderId);
    if (!rider) {
      return res.status(400).json({ message: "Rider not Found" });
    }

    const order = await Order.find({
      rider: riderId,
      orderStatus: {
        $in: [orderStatus.AssignRider, orderStatus.OnDelivery],
      },
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

// PUT accept order and deliver meal
exports.acceptOrder = async (req, res, next) => {
  const riderId = req.params.riderId;
  const orderId = req.params.orderId;

  try {
    // Check if rider exist
    const rider = await User.findById(riderId);
    if (!rider) {
      return res.status(400).json({ message: "Rider not Found" });
    }

    // Check if order exist
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not Found" });
    }

    // Validate assigned rider
    if (order.rider.toString() !== rider._id.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have access to this resources!" });
    }

    order.orderStatus = orderStatus.OnDelivery;
    await order.save();

    return res.status(200).json({ message: "Order on delivery!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// PUT finish deliver meal
exports.orderDelivered = async (req, res, next) => {
  const riderId = req.params.riderId;
  const orderId = req.params.orderId;

  try {
    // Check if rider exist
    const rider = await User.findById(riderId);
    if (!rider) {
      return res.status(400).json({ message: "Rider not Found" });
    }

    // Check if order exist
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not Found" });
    }

    // Validate assigned rider
    if (order.rider.toString() !== rider._id.toString()) {
      return res
        .status(400)
        .json({ message: "You don't have access to this resources!" });
    }

    order.orderStatus = orderStatus.Complete;
    await order.save();

    return res.status(200).json({ message: "Order delivered!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};
