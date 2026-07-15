import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= TOKEN HELPERS ================= */
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // short life
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      company,
      companyAddress,
      city,
      state,
      country,
    } = req.body;

    // ✅ VALIDATIONS
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!company || company.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Company is required",
      });
    }

    if (!companyAddress || companyAddress.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Company address is required",
      });
    }

    if (!country || country.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Country is required",
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!password || !strongPasswordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Weak password",
      });
    }

    const phoneRegex = /^\+[1-9]\d{7,14}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ CREATE USER
    await User.create({
      name,
      email,
      password,
      phone,
      company,
      companyAddress,
      city: city || "",
      state: state || "",
      country,
    });

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  console.log("LOGIN HIT 🔥");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 🔐 TOKENS
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 💾 save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // 🍪 SET COOKIES
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
      console.error("LOGIN ERROR ❌:", error);
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

/* ================= REFRESH TOKEN ================= */
export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "No refresh token",
      });
    }

    // 🔍 verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

    // ❌ invalid / stolen token
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    // 🔐 generate new access token
    const newAccessToken = generateAccessToken(user);

    // 🍪 update cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ success: true });

  } catch (error) {
    return res.status(403).json({
      message: "Token expired",
    });
  }
};

/* ================= LOGOUT ================= */
export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      const user = await User.findOne({ refreshToken: token });

      if (user) {
        user.refreshToken = null; // ❌ destroy session
        await user.save();
      }
    }

    // 🧹 clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};