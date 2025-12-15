import Product from "../models/productModel.js";
import Store from "../models/storeModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import slugify from "slugify";

const productController = {
  // === EXISTING METHODS (Updated for seller/store) ===

  async createProduct(req, res) {
    try {
      const productData = req.body;

      // Check if user is seller or admin
      if (req.user.role !== "admin" && req.user.role !== "seller") {
        return res.status(403).json({
          error: "Access denied. Only sellers or admins can create products.",
        });
      }

      // For sellers: validate they own the store
      if (req.user.role === "seller") {
        const { store } = productData;

        if (!store) {
          return res.status(400).json({
            error: "Store ID is required for sellers.",
          });
        }

        // Verify seller owns this store
        const storeExists = await Store.findOne({
          _id: store,
          seller: req.user.id,
        });

        if (!storeExists) {
          return res.status(403).json({
            error: "Access denied. You do not own this store.",
          });
        }

        // Add seller ID to product data
        productData.seller = req.user.id;
      }

      // For admin: seller can be specified in request
      if (req.user.role === "admin" && !productData.seller) {
        // Admin can create products without seller (platform products)
        productData.seller = req.user.id; // Or leave null for platform
      }

      // Generate slug for SEO
      if (productData.name && !productData.slug) {
        productData.slug = slugify(productData.name, {
          lower: true,
          strict: true,
        });

        // Check if slug exists
        const existingSlug = await Product.findOne({
          "seo.slug": productData.slug,
        });
        if (existingSlug) {
          productData.slug = `${productData.slug}-${Date.now()}`;
        }
      }

      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();

      res.status(201).json({
        message: "Product created successfully",
        product: savedProduct,
      });
    } catch (error) {
      res.status(400).json({
        error: "Failed to create product",
        details: error.message,
      });
    }
  },

  async getAllProducts(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        category,
        minPrice,
        maxPrice,
        status,
        seller,
        store,
      } = req.query;

      const filter = {};

      // Apply filters
      if (category) filter["category.main"] = category;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }
      if (status) filter.status = status;
      if (seller) filter.seller = seller;
      if (store) filter.store = store;

      // Only show active products to non-admin users
      if (req.user?.role !== "admin") {
        filter.status = "active";
        filter.isPublished = true;
      }

      const skip = (page - 1) * limit;

      const products = await Product.find(filter)
        .populate("seller", "firstName lastName email")
        .populate("store", "name slug")
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

      const totalProducts = await Product.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts,
          hasNextPage: page * limit < totalProducts,
          hasPrevPage: page > 1,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch products",
        details: error.message,
      });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;

      // Check if id is MongoDB ID or numeric ID
      let product;
      if (mongoose.Types.ObjectId.isValid(id)) {
        product = await Product.findById(id)
          .populate("seller", "firstName lastName email sellerProfile")
          .populate("store", "name slug logo contactEmail");
      } else {
        product = await Product.findOne({ id: parseInt(id) })
          .populate("seller", "firstName lastName email sellerProfile")
          .populate("store", "name slug logo contactEmail");
      }

      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }

      // Check if product is accessible (active or user is admin/seller)
      if (
        product.status !== "active" &&
        req.user?.role !== "admin" &&
        req.user?.id !== product.seller?._id?.toString()
      ) {
        return res.status(403).json({
          success: false,
          error: "Product not available",
        });
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Failed to fetch product",
        details: error.message,
      });
    }
  },

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      // Find product
      let product;
      if (mongoose.Types.ObjectId.isValid(id)) {
        product = await Product.findById(id);
      } else {
        product = await Product.findOne({ id: parseInt(id) });
      }

      if (!product) {
        return res.status(404).json({
          error: "Product not found for update",
        });
      }

      // Check permissions
      const isAdmin = req.user.role === "admin";
      const isSellerOwner =
        req.user.role === "seller" && product.seller.toString() === req.user.id;

      if (!isAdmin && !isSellerOwner) {
        return res.status(403).json({
          error: "Access denied. You do not own this product.",
        });
      }

      // For sellers: validate they own the store if changing store
      if (
        req.user.role === "seller" &&
        updatedData.store &&
        updatedData.store !== product.store.toString()
      ) {
        const storeExists = await Store.findOne({
          _id: updatedData.store,
          seller: req.user.id,
        });

        if (!storeExists) {
          return res.status(403).json({
            error: "Access denied. You do not own this store.",
          });
        }
      }

      // Update product
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: product._id },
        updatedData,
        { new: true, runValidators: true }
      );

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(400).json({
        error: "Failed to update product",
        details: error.message,
      });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      // Find product
      let product;
      if (mongoose.Types.ObjectId.isValid(id)) {
        product = await Product.findById(id);
      } else {
        product = await Product.findOne({ id: parseInt(id) });
      }

      if (!product) {
        return res.status(404).json({
          error: "Product not found for deletion",
        });
      }

      // Check permissions
      const isAdmin = req.user.role === "admin";
      const isSellerOwner =
        req.user.role === "seller" && product.seller.toString() === req.user.id;

      if (!isAdmin && !isSellerOwner) {
        return res.status(403).json({
          error: "Access denied. You do not own this product.",
        });
      }

      // Soft delete: change status to archived
      product.status = "archived";
      await product.save();

      // Or hard delete:
      // await Product.findByIdAndDelete(product._id);

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        error: "Failed to delete product",
        details: error.message,
      });
    }
  },

  // === NEW SELLER-SPECIFIC METHODS ===

  // Get seller's products
  async getSellerProducts(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10, status, storeId, search } = req.query;

      const filter = { seller: userId };

      // Apply filters
      if (status) filter.status = status;
      if (storeId && mongoose.Types.ObjectId.isValid(storeId)) {
        filter.store = storeId;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { sku: { $regex: search, $options: "i" } },
        ];
      }

      const skip = (page - 1) * limit;

      const products = await Product.find(filter)
        .populate("store", "name slug")
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

      const totalProducts = await Product.countDocuments(filter);

      // Get stats
      const stats = await Product.aggregate([
        { $match: { seller: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
          },
        },
      ]);

      res.status(200).json({
        success: true,
        data: {
          products,
          stats: stats.reduce((acc, stat) => {
            acc[stat._id] = stat.count;
            return acc;
          }, {}),
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
      res.status(500).json({
        success: false,
        error: "Failed to fetch seller products",
        details: error.message,
      });
    }
  },

  // Create product (seller-specific with validation)
  async createSellerProduct(req, res) {
    try {
      const userId = req.user.id;
      const productData = req.body;

      // Validate required fields
      const requiredFields = ["name", "price", "stock", "store"];
      const missingFields = requiredFields.filter(
        (field) => !productData[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      // Verify seller owns the store
      const store = await Store.findOne({
        _id: productData.store,
        seller: userId,
      });

      if (!store) {
        return res.status(403).json({
          error: "Access denied. You do not own this store.",
        });
      }

      // Add seller to product data
      productData.seller = userId;

      // Set default status
      if (!productData.status) {
        productData.status = "draft";
      }

      // Generate slug
      if (!productData.slug) {
        productData.slug = slugify(productData.name, {
          lower: true,
          strict: true,
        });

        const existingSlug = await Product.findOne({
          "seo.slug": productData.slug,
        });
        if (existingSlug) {
          productData.slug = `${productData.slug}-${Date.now()}`;
        }
      }

      // Handle images if uploaded
      if (req.files && req.files.length > 0) {
        productData.images = req.files.map((file, index) => ({
          url: file.path,
          publicId: file.filename,
          isPrimary: index === 0,
        }));
      }

      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();

      // Update store product count
      await Store.findByIdAndUpdate(store._id, {
        $inc: { totalProducts: 1 },
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: savedProduct,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Failed to create product",
        details: error.message,
      });
    }
  },

  // Bulk update product status
  async bulkUpdateProducts(req, res) {
    try {
      const userId = req.user.id;
      const { productIds, status } = req.body;

      if (
        !productIds ||
        !Array.isArray(productIds) ||
        productIds.length === 0
      ) {
        return res.status(400).json({
          error: "Product IDs array is required",
        });
      }

      if (!status) {
        return res.status(400).json({
          error: "Status is required",
        });
      }

      // Verify all products belong to the seller
      const products = await Product.find({
        _id: { $in: productIds },
        seller: userId,
      });

      if (products.length !== productIds.length) {
        return res.status(403).json({
          error: "Access denied. Some products do not belong to you.",
        });
      }

      // Update all products
      await Product.updateMany(
        { _id: { $in: productIds } },
        { $set: { status } }
      );

      res.status(200).json({
        success: true,
        message: `${productIds.length} products updated successfully`,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Failed to update products",
        details: error.message,
      });
    }
  },

  // === EXISTING METHODS (Keep as is) ===

  async getTotalProductByCategory(req, res) {
    try {
      const result = await Product.aggregate([
        {
          $group: {
            _id: "$masterCategory",
            totalProducts: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error fetching total products by category",
        details: error.message,
      });
    }
  },

  async getPublishedProduct(req, res) {
    try {
      const publishedProducts = await Product.find({
        isPublished: true,
        status: "active",
      })
        .populate("store", "name slug")
        .populate("seller", "firstName lastName");

      res.status(200).json({ success: true, data: publishedProducts });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Error fetching published products",
        details: error.message,
      });
    }
  },

  // === NEW: Get products by store (public) ===
  async getProductsByStore(req, res) {
    try {
      const { storeSlug } = req.params;
      const { page = 1, limit = 12 } = req.query;

      const store = await Store.findOne({ slug: storeSlug });
      if (!store) {
        return res.status(404).json({
          success: false,
          error: "Store not found",
        });
      }

      const filter = {
        store: store._id,
        status: "active",
        isPublished: true,
      };

      const skip = (page - 1) * limit;

      const products = await Product.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

      const totalProducts = await Product.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: {
          store: {
            name: store.name,
            description: store.description,
            logo: store.logo,
          },
          products,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch store products",
        details: error.message,
      });
    }
  },
};

export default productController;
