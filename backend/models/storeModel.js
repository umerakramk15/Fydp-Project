import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: String,
    logo: {
      url: String,
      publicId: String,
    },
    banner: {
      url: String,
      publicId: String,
    },
    contactEmail: String,
    contactPhone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    socialLinks: {
      website: String,
      facebook: String,
      instagram: String,
      twitter: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "active", "inactive", "suspended"],
      default: "draft",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    settings: {
      currency: {
        type: String,
        default: "USD",
      },
      language: {
        type: String,
        default: "en",
      },
      notificationPreferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create index for faster queries
storeSchema.index({ seller: 1, status: 1 });
storeSchema.index({ slug: 1 });

export default mongoose.model("Store", storeSchema);
