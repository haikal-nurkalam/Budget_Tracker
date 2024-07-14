import Express from "express";
import bcrypt from "bcrypt";
import db from "../models/index.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await db.User.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // Check if username or email already exists
    let findUsername = await db.User.findOne({ where: { username } });
    let findEmail = await db.User.findOne({ where: { email } });

    if (findUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }
    if (findEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    let newUser = await db.User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Convert user to plain object and remove sensitive fields
    const userData = user.toJSON();
    delete userData.password;
    delete userData.email;

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${userData.username}`,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Edit User
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Find user by ID
    let user = await db.User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash new password if provided
    let hashedPassword = user.password; // Default to the existing password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Update user information
    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Find user by id

    let user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({ message: "User Successfully find", user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await db.User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Delete the user
    await user.destroy();

    return res.status(200).json({
      message: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { router as userController };
