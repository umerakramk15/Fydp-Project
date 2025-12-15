import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      maxlength: 200,
    },

    // Seller & Store Information
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    // Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    comparePrice: {
      type: Number,
      min: 0,
    },
    costPrice: {
      type: Number,
      min: 0,
    },

    // Inventory
    sku: {
      type: String,
      unique: true,
      sparse: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    manageStock: {
      type: Boolean,
      default: true,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },

    // Categories (keeping your existing structure but improving it)
    category: {
      main: {
        type: String,
        required: true,
      },
      sub: {
        type: String,
      },
      type: {
        type: String,
      },
    },

    // Product Details
    brand: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex", "Kids", ""],
      default: "",
    },
    color: {
      type: String,
    },
    size: [
      {
        value: String,
        stock: Number,
      },
    ],
    weight: {
      type: Number,
      default: 0,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },

    // Images
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
        altText: String,
      },
    ],

    // Variants (for products with multiple options like size/color)
    variants: [
      {
        name: String,
        options: [String],
        values: [
          {
            option: String,
            price: Number,
            stock: Number,
            sku: String,
          },
        ],
      },
    ],

    // Shipping
    shipping: {
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      shippingClass: String,
      isFreeShipping: {
        type: Boolean,
        default: false,
      },
    },

    // SEO
    seo: {
      title: String,
      description: String,
      keywords: [String],
      slug: {
        type: String,
        unique: true,
        lowercase: true,
      },
    },

    // Status & Visibility
    status: {
      type: String,
      enum: ["draft", "active", "inactive", "out_of_stock", "archived"],
      default: "draft",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Analytics
    views: {
      type: Number,
      default: 0,
    },
    salesCount: {
      type: Number,
      default: 0,
    },

    // Reviews & Ratings
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    // Discounts
    discount: {
      type: {
        type: String,
        enum: ["percentage", "fixed", "none"],
        default: "none",
      },
      value: {
        type: Number,
        default: 0,
      },
      startDate: Date,
      endDate: Date,
    },

    // Additional Information
    tags: [String],
    attributes: [
      {
        name: String,
        value: String,
      },
    ],

    // Return Policy
    returnPolicy: {
      isReturnable: {
        type: Boolean,
        default: true,
      },
      returnWindow: {
        type: Number,
        default: 30, // days
      },
      returnConditions: String,
    },

    // Your existing fields (for backward compatibility)
    articleType: String,
    baseColour: String,
    season: {
      type: String,
      enum: ["Spring", "Summer", "Autumn", "Winter", ""],
    },
    year: Number,
    usage: String,
    productDisplayName: String,
    masterCategory: String,
    subCategory: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for sale price
productSchema.virtual("salePrice").get(function () {
  if (this.discount.type === "percentage" && this.discount.value > 0) {
    return this.price * (1 - this.discount.value / 100);
  } else if (this.discount.type === "fixed" && this.discount.value > 0) {
    return this.price - this.discount.value;
  }
  return this.price;
});

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(
      ((this.comparePrice - this.price) / this.comparePrice) * 100
    );
  }
  return 0;
});

// Indexes for faster queries
productSchema.index({ seller: 1, status: 1 });
productSchema.index({ store: 1 });
productSchema.index({ "category.main": 1 });
productSchema.index({ status: 1, isPublished: 1 });
productSchema.index({ "seo.slug": 1 }, { unique: true });

const Product = model("Product", productSchema);

export default Product;
