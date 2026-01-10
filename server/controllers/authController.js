import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      company,
      city,
      state,
    } = req.body;

    // ---------- VALIDATION (REAL LIFE) ----------
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!password || !strongPasswordRegex.test(password)) {
  return res.status(400).json({
    success: false,
    message:
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
  });
}


    const phoneRegex = /^\+[1-9]\d{7,14}$/;

if (!phone || !phoneRegex.test(phone)) {
  return res.status(400).json({
    success: false,
    message: "Phone number must include country code (e.g. +14155552671)",
  });
}


    // ---------- CHECK EXISTING USER ----------
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ---------- CREATE USER ----------
    await User.create({
      name,
      email,
      password, // auto-hashed in model
      phone,
      company: company || "",
      city: city || "",
      state: state || "",
    });

    // ---------- RESPONSE ----------
    return res.status(201).json({
      success: true,
      message: "Registered successfully",
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ---------- VALIDATION ----------
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // ---------- FIND USER ----------
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ---------- CHECK PASSWORD ----------
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ---------- TOKEN ----------
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // safer than 7d
    );

    // ---------- RESPONSE ----------
    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        city: user.city,
        state: user.state,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
