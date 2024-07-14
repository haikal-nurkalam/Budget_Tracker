import Express from "express";
import db from "../models/index.js";

const router = Express.Router();

// Get all Category
router.get("/", async (req, res) => {
  try {
    const response = await db.Category.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// Post Category
router.post("/", async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }
    const newCategory = await db.Category.create({ userId, name });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Edit category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let category = await db.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.update({ name: name || category.name });

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete Category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let category = await db.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.destroy();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { router as categoryRouter };
