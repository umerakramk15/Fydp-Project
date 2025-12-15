import Store from "../models/storeModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import slugify from "slugify";

// Create a new store
export const createStore = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Not a seller.",
      });
    }

    // Check seller status
    if (user.sellerProfile?.status !== "approved") {
      return res.status(403).json({
        success: false,
        message:
          "Your seller account is not approved yet. Please wait for admin approval.",
      });
    }

    const {
      name,
      description,
      contactEmail,
      contactPhone,
      address,
      socialLinks,
    } = req.body;

    // Validate name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Store name is required",
      });
    }

    // Generate slug from name
    const slug = slugify(name.trim(), {
      lower: true,
      strict: true,
      replacement: "-",
    });

    // Check if slug already exists
    const existingStore = await Store.findOne({ slug });
    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: "Store name already exists. Please choose a different name.",
      });
    }

    // Create store
    const storeData = {
      seller: userId,
      name: name.trim(),
      slug,
      description: description || "",
      contactEmail: contactEmail || user.email,
      contactPhone: contactPhone || user.sellerProfile?.phone || "",
      address: address || user.sellerProfile?.address || {},
      socialLinks: socialLinks || {},
      status: "draft",
    };

    // Handle logo upload if provided
    if (req.file) {
      storeData.logo = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const store = new Store(storeData);
    await store.save();

    // Update user's store count
    user.sellerProfile.storeCount = (user.sellerProfile.storeCount || 0) + 1;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    console.error("Create store error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all stores for a seller
export const getSellerStores = async (req, res) => {
  try {
    const userId = req.user.id;

    const stores = await Store.find({ seller: userId }).sort({ createdAt: -1 });

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
    });
  } catch (error) {
    console.error("Get stores error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single store by ID
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const store = await Store.findOne({
      _id: id,
      seller: userId,
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found or access denied",
      });
    }

    // Get store products
    const products = await Product.find({ store: store._id })
      .select("name price images status stock")
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        store,
        recentProducts: products,
      },
    });
  } catch (error) {
    console.error("Get store error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update store
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const store = await Store.findOne({
      _id: id,
      seller: userId,
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found or access denied",
      });
    }

    const {
      name,
      description,
      contactEmail,
      contactPhone,
      address,
      socialLinks,
      status,
    } = req.body;

    // Update fields
    if (name && name !== store.name) {
      store.name = name;
      store.slug = slugify(name, { lower: true, strict: true });
    }

    if (description !== undefined) store.description = description;
    if (contactEmail !== undefined) store.contactEmail = contactEmail;
    if (contactPhone !== undefined) store.contactPhone = contactPhone;
    if (address !== undefined) store.address = address;
    if (socialLinks !== undefined) store.socialLinks = socialLinks;
    if (status !== undefined) store.status = status;

    // Update logo if new file uploaded
    if (req.file) {
      store.logo = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await store.save();

    res.status(200).json({
      success: true,
      message: "Store updated successfully",
      data: store,
    });
  } catch (error) {
    console.error("Update store error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete store
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const store = await Store.findOne({
      _id: id,
      seller: userId,
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found or access denied",
      });
    }

    // Check if store has products
    const productCount = await Product.countDocuments({ store: store._id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete store. It has ${productCount} products. Remove products first.`,
      });
    }

    await Store.findByIdAndDelete(id);

    // Update user's store count
    await User.findByIdAndUpdate(userId, {
      $inc: { "sellerProfile.storeCount": -1 },
    });

    res.status(200).json({
      success: true,
      message: "Store deleted successfully",
    });
  } catch (error) {
    console.error("Delete store error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
