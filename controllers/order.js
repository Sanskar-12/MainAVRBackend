import { Item } from "../models/item.js";
import { User } from "../models/User.js";
import { Orders } from "../models/order.js";
import Department from "../models/department.js";
import ApiFeature from "../utils/apiFeatures.js";
export const createOrder = async (req, res, next) => {
  try {
    const { orderDate, approvedDate, status, price, quantity, item, user, department, orderStatus ,ordertype} = req.body;
    // const departments = await Department.findById(department);
    // const items = await Item.findById(item);
    // const users = await User.findById(user);

    if (!orderDate || !approvedDate || !status || !price || !quantity || !item || !user || !department) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields",
      });
    }

    if (req.user.user_level !== "Intiator") {
      return res.status(400).json({
        success: false,
        message: "User not Authorized",
      });
    }

    // Find an existing order based on your criteria
    const existingOrder = await Orders.findOne({
      orderDate,
      approvedDate,
      orderStatus,
      item,
      user,
      department,
    });

    if (existingOrder) {
      // Update the quantity of the existing order
      existingOrder.quantity += quantity;
      await existingOrder.save();

      return res.status(200).json({
        success: true,
        order: existingOrder,
      });
    } else {
      // Create a new order
      const order = await Orders.create({
        orderDate,
        approvedDate,
        status,
        price,
        quantity,
        item,
        user,
        department,
        orderStatus,
        ordertype
      });

      return res.status(200).json({
        success: true,
        order,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getallOrders = async (req, res, next) => {
  try {
    const resultPerPage=5
    const orderCount=await Orders.countDocuments()

    const apifeature=new ApiFeature(Orders,req.query).search().filter().pagination(resultPerPage)

   const orders=await apifeature.query.populate("item user")

    res.status(200).json({
      success:true,
      orders,
      orderCount
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterOrder = async (req, res, next) => {
  try {
    const { selectedCategories } = req.body;

    if (!selectedCategories || selectedCategories.length === 0) {
      const items = await Orders.find({});
      return res.status(200).json({
        success: true,
        items,
      });
    } else {
      const items = await Orders.find({
        categorie: { $in: selectedCategories },
      });
      return res.status(200).json({
        success: true,
        items,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AcceptOrder = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.orderStatus = "Accept";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Accepted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const RejectOrder = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.orderStatus = "Reject";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Rejected",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getallOrderById = async (req, res, next) => {
  try {
    const {id}=req.params

    const order=await Orders.findById(id)

    res.status(200).json({
      success:true,
      order
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};