import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Admin access required" });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

// NEW: Seller role middleware
export const isSeller = async (req, res, next) => {
  try {
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Seller access required" });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

// NEW: Buyer role middleware
export const isBuyer = async (req, res, next) => {
  try {
    if (req.user.role !== "buyer" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Buyer access required" });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

// NEW: Check if user is seller OR admin
export const isSellerOrAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Seller or Admin access required" });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};
