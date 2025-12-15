import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // CHANGE 1: Replace isAdmin with role field
    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin'],
      default: 'buyer'
    },
    
    // For backward compatibility, you can keep isAdmin but make it virtual
    // Or we can migrate data later
    
    resetCode: {
      type: String,
    },
    resetCodeExpiry: {
      type: Date,
    },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
        addressType: { 
          type: String, 
          enum: ['shipping', 'billing', 'both'],
          default: 'shipping'
        }
      },
    ],
    creditCards: [
      {
        cardNumber: { type: String, required: true },
        cardHolderName: { type: String, required: true },
        expirationDate: { type: String, required: true },
        cvv: { type: String, required: true },
        billingAddress: {
          street: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          postalCode: { type: String, required: true },
          country: { type: String, required: true },
        },
      },
    ],
    transactions: [
      {
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
        status: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        orderId: { type: String, required: true },
      },
    ],
    
    // ADD: Seller-specific fields (optional, can be in separate Seller model)
    sellerProfile: {
      businessName: String,
      businessType: String,
      taxId: String,
      phone: String,
      status: {
        type: String,
        enum: ['pending', 'approved', 'suspended', 'rejected'],
        default: 'pending'
      },
      storeCount: {
        type: Number,
        default: 0
      }
    }
  },
  { timestamps: true }
);

// For backward compatibility - virtual field
userSchema.virtual('isAdmin').get(function() {
  return this.role === 'admin';
});

export default mongoose.model("User", userSchema);