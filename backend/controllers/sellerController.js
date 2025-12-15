import User from "../models/userModel.js";
import Store from "../models/storeModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// Register as seller
export const registerAsSeller = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already a seller
    if (user.role === "seller") {
      return res.status(400).json({ message: "Already registered as seller" });
    }

    const { businessName, businessType, taxId, phone, address } = req.body;

    // Update user to seller
    user.role = "seller";
    user.sellerProfile = {
      businessName,
      businessType: businessType || "Individual",
      taxId,
      phone,
      address: address || user.addresses[0],
      status: "pending", // Admin needs to approve
      storeCount: 0,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Seller registration submitted successfully. Waiting for admin approval.",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        sellerProfile: user.sellerProfile,
      },
    });
  } catch (error) {
    console.error("Seller registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get seller dashboard
export const getSellerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || user.role !== "seller") {
      return res.status(403).json({ message: "Access denied. Not a seller." });
    }

    // Get seller's stores
    const stores = await Store.find({ seller: userId });

    // Get total products
    const totalProducts = await Product.countDocuments({ seller: userId });

    // Get products by store
    const storeProducts = {};
    for (const store of stores) {
      const productCount = await Product.countDocuments({ store: store._id });
      storeProducts[store._id] = productCount;
    }

    // Calculate total sales (you'll implement this later with orders)
    const totalSales = 0;
    const pendingBalance = 0;

    res.status(200).json({
      success: true,
      data: {
        seller: {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          businessName: user.sellerProfile?.businessName,
          status: user.sellerProfile?.status,
          storeCount: user.sellerProfile?.storeCount || 0,
        },
        stats: {
          totalStores: stores.length,
          totalProducts,
          totalSales,
          pendingBalance,
        },
        stores: stores.map((store) => ({
          id: store._id,
          name: store.name,
          slug: store.slug,
          status: store.status,
          productCount: storeProducts[store._id] || 0,
          totalSales: store.totalSales || 0,
          createdAt: store.createdAt,
        })),
        recentActivities: [], // You can add activity tracking later
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update seller profile
export const updateSellerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || user.role !== "seller") {
      return res.status(403).json({ message: "Access denied. Not a seller." });
    }

    const { businessName, businessType, taxId, phone, address } = req.body;

    // Update seller profile
    user.sellerProfile = {
      ...user.sellerProfile,
      businessName: businessName || user.sellerProfile?.businessName,
      businessType: businessType || user.sellerProfile?.businessType,
      taxId: taxId || user.sellerProfile?.taxId,
      phone: phone || user.sellerProfile?.phone,
      address: address || user.sellerProfile?.address,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      sellerProfile: user.sellerProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get seller's products
export const getSellerProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status, storeId } = req.query;

    const user = await User.findById(userId);
    if (!user || user.role !== "seller") {
      return res.status(403).json({ message: "Access denied. Not a seller." });
    }

    const filter = { seller: userId };

    if (status) filter.status = status;
    if (storeId && mongoose.Types.ObjectId.isValid(storeId)) {
      filter.store = storeId;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate("store", "name slug")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts,
          hasNextPage: page * limit < totalProducts,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
