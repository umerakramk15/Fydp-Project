import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotrnv from "dotenv";

dotrnv.config();
export const userRegisterController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validation
    if (!firstName) {
      return res.status(400).send({
        status: false,
        message: "First name is required",
      });
    }

    if (!lastName) {
      return res.status(400).send({
        status: false,
        message: "Last name is required",
      });
    }

    if (!email) {
      return res.status(400).send({
        status: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).send({
        status: false,
        message: "Password is required",
      });
    }

    // Check if user exists
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.status(400).send({
        status: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role (default to 'buyer' if not specified)
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "buyer", // Default role is buyer
    });

    // Generate JWT token with role
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      function: "User Register Controller",
      message: error.message,
    });
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({
        status: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).send({
        status: false,
        message: "Password is required",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        status: false,
        message: "User doesn't exist",
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).send({
        status: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token with role
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user data (excluding sensitive info)
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      addresses: user.addresses,
      createdAt: user.createdAt,
    };

    // Add seller profile if user is a seller
    if (user.role === "seller" && user.sellerProfile) {
      userData.sellerProfile = user.sellerProfile;
    }

    res.status(200).send({
      status: true,
      message: "User logged in successfully",
      data: {
        user: userData,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      function: "User Login Controller",
      message: error.message,
    });
  }
};

export const userLogoutControllers = async (req, res, next) => {
  try {
    // In JWT-based auth, logout is handled client-side by removing the token
    // But we can blacklist tokens if needed (requires token blacklist implementation)

    res.status(200).send({
      status: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      function: "User Logout Controller",
      message: error.message,
    });
  }
};

// Get current user profile
// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password -resetCode -resetCodeExpiry -creditCards");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, addresses } = req.body;

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (addresses) updateData.addresses = addresses;

    const user = await userModel
      .findByIdAndUpdate(req.user.id, updateData, {
        new: true,
        runValidators: true,
      })
      .select("-password -resetCode -resetCodeExpiry -creditCards");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const requestResetController = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User with this email does not exist",
      });
    }

    // Generate a random confirmation code
    const confirmationCode = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase(); // 6-character code
    const codeExpiry = Date.now() + 15 * 60 * 1000; // Code valid for 15 minutes

    // Update user with the reset code and expiry
    user.resetCode = confirmationCode;
    user.resetCodeExpiry = codeExpiry;
    await user.save();

    // Send the code via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const emailBody = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .email-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 400px;
          }
          h1 {
            color: #333333;
            text-align: center;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 4px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            margin-top: 20px;
            color: #888;
          }
          .button {
            display: block;
            width: 100%;
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            text-align: center;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 30px;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Password Reset Request</h1>
          <p>Hello,</p>
          <p>You requested a password reset. Please use the following confirmation code to reset your password:</p>
          <div class="code">${confirmationCode}</div>
          <p>Note: This code will expire in 15 minutes.</p>
          <a href="http://dekanex.vercel.app" class="button">Reset Password</a>
          <div class="footer">
            <p>If you did not request this, please ignore this email.</p>
            <p>Thank you for using our service.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Confirmation Code",
      text: `Your confirmation code is: ${confirmationCode}`,
      html: emailBody,
    });

    res.status(200).json({
      status: true,
      message: "Confirmation code sent to your email.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to send confirmation code.",
      error: error.message,
    });
  }
};

export const verifyCodeController = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User with this email does not exist",
      });
    }

    // Verify the code and expiration
    if (
      user.resetCode !== confirmationCode ||
      user.resetCodeExpiry < Date.now()
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid or expired confirmation code",
      });
    }

    res.status(200).json({
      status: true,
      message: "Confirmation code verified. Proceed to reset your password.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to verify confirmation code.",
      error: error.message,
    });
  }
};

export const changePasswordController = async (req, res, next) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Passwords do not match.",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User with this email does not exist",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset code
    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpiry = undefined;
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update password.",
      error: error.message,
    });
  }
};
