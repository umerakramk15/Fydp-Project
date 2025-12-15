import User from "../models/userModel.js";
import Store from "../models/storeModel.js";
import Product from "../models/productModel.js";

// Get all sellers
export const getAllSellers = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const filter = { role: "seller" };
    if (status) {
      filter["sellerProfile.status"] = status;
    }

    const skip = (page - 1) * limit;

    const sellers = await User.find(filter)
      .select("firstName lastName email sellerProfile createdAt")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalSellers = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: sellers.length,
      total: totalSellers,
      data: sellers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalSellers / limit),
        totalSellers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get seller by ID
export const getSellerById = async (req, res) => {
  try {
    const seller = await User.findOne({
      _id: req.params.id,
      role: "seller",
    }).select("-password -creditCards");

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Get seller's stores
    const stores = await Store.find({ seller: seller._id });

    // Get seller's products count
    const productCount = await Product.countDocuments({ seller: seller._id });

    // Get recent products
    const recentProducts = await Product.find({ seller: seller._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name price status images");

    res.status(200).json({
      success: true,
      data: {
        seller,
        stores,
        recentProducts,
        stats: {
          storeCount: stores.length,
          productCount,
          activeStores: stores.filter((s) => s.status === "active").length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update seller status (approve/reject/suspend)
export const updateSellerStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;

    if (!status || !["approved", "rejected", "suspended"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required: approved, rejected, or suspended",
      });
    }

    const seller = await User.findOne({
      _id: req.params.id,
      role: "seller",
    });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Update seller status
    seller.sellerProfile.status = status;
    if (reason) {
      seller.sellerProfile.statusReason = reason;
    }
    await seller.save();

    // If rejected or suspended, deactivate all stores
    if (status === "rejected" || status === "suspended") {
      await Store.updateMany({ seller: seller._id }, { status: "inactive" });

      // Also deactivate all products
      await Product.updateMany({ seller: seller._id }, { status: "inactive" });
    }

    // If approved, activate stores
    if (status === "approved") {
      await Store.updateMany({ seller: seller._id }, { status: "active" });
    }

    res.status(200).json({
      success: true,
      message: `Seller ${status} successfully`,
      data: {
        id: seller._id,
        email: seller.email,
        name: `${seller.firstName} ${seller.lastName}`,
        status: seller.sellerProfile.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all stores (admin view)
export const getAllStores = async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { "seller.email": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const stores = await Store.find(filter)
      .populate("seller", "firstName lastName email")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalStores = await Store.countDocuments(filter);

    // Get product count for each store
    const storesWithCounts = await Promise.all(
      stores.map(async (store) => {
        const productCount = await Product.countDocuments({ store: store._id });
        return {
          ...store.toObject(),
          productCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: storesWithCounts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalStores / limit),
        totalStores,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update store status (admin)
export const updateStoreStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["active", "inactive", "suspended"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required: active, inactive, or suspended",
      });
    }

    const store = await Store.findById(req.params.id).populate(
      "seller",
      "firstName lastName email"
    );

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    store.status = status;
    await store.save();

    // Update all products in this store
    await Product.updateMany(
      { store: store._id },
      { status: status === "active" ? "active" : "inactive" }
    );

    res.status(200).json({
      success: true,
      message: `Store ${status} successfully`,
      data: {
        store: {
          id: store._id,
          name: store.name,
          status: store.status,
          seller: store.seller,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get platform statistics
export const getPlatformStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalBuyers,
      totalSellers,
      totalStores,
      totalProducts,
      activeStores,
      pendingSellers,
      totalOrders, // You'll implement this later
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "buyer" }),
      User.countDocuments({ role: "seller" }),
      Store.countDocuments(),
      Product.countDocuments(),
      Store.countDocuments({ status: "active" }),
      User.countDocuments({
        role: "seller",
        "sellerProfile.status": "pending",
      }),
      Promise.resolve(0), // Placeholder for orders
    ]);

    // Get recent activities
    const recentSellers = await User.find({ role: "seller" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("firstName lastName email sellerProfile.status createdAt");

    const recentStores = await Store.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("seller", "firstName lastName");

    // Get products by category
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category.main",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Get stores by status
    const storesByStatus = await Store.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          totalUsers,
          totalBuyers,
          totalSellers,
          totalStores,
          totalProducts,
          activeStores,
          pendingSellers,
          totalOrders,
        },
        recent: {
          sellers: recentSellers,
          stores: recentStores,
        },
        analytics: {
          productsByCategory,
          storesByStatus,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all users (admin)
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .select("-password -creditCards")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update user role (admin)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!role || !["buyer", "seller", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Valid role is required: buyer, seller, or admin",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If changing to seller, initialize seller profile
    if (role === "seller" && user.role !== "seller") {
      user.sellerProfile = {
        businessName: `${user.firstName} ${user.lastName}`,
        businessType: "Individual",
        status: "approved",
      };
    }

    // If changing from seller to another role, clean up
    if (user.role === "seller" && role !== "seller") {
      user.sellerProfile = undefined;
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully`,
      data: {
        id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
