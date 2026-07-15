import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 Protect (logged-in users)
export const protect = async (req, res, next) => {
  try {
    // 🍪 get token from cookies
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 🔍 verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 👤 attach user
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token expired or invalid",
    });
  }
};

// 🛑 Admin-only access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin access required",
    });
  }
};
