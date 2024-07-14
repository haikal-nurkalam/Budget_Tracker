import Express from "express";
import db from "../models/index.js";

const router = Express.Router();

// List all transaction
router.get("/", async (req, res) => {
  try {
    const response = await db.Transaction.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// Create a new transaction
router.post("/", async (req, res) => {
  try {
    const { userId, amount, inOrOut, category, description, transactionDate } =
      req.body;

    // Validate the request body
    if (!userId || !amount || !inOrOut || !category || !transactionDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Create a new transaction
    const transaction = await db.Transaction.create({
      userId,
      amount,
      inOrOut,
      category,
      description,
      transactionDate,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all transactions for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all transactions for the user
    const transactions = await db.Transaction.findAll({
      where: { userId },
    });

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get a single transaction by ID
router.get("/system/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the transaction by ID
    const transaction = await db.Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update a transaction by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, amount, inOrOut, category, description, transactionDate } =
      req.body;

    // Find the transaction by ID
    let transaction = await db.Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Update the transaction
    await transaction.update({
      userId,
      amount,
      inOrOut,
      category,
      description,
      transactionDate,
    });

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete a transaction by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the transaction by ID
    let transaction = await db.Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Delete the transaction
    await transaction.destroy();

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { router as transactionRouter };
