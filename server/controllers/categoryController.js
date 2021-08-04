import Category from "../models/categoryModel";
import { findByIdAndUpdate } from "../models/userModel";

// @desc    Fetch all categories by idList
// @route   GET /api/categories/list/:idList
// @access  Public
export const getCategoriesByList = async (req, res, next) => {
  try {
    const categories = await Category.find({ idList: req.params.idList });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a category
// @route   POST /api/categories/list/:idList
// @access  Private
export const createCategoriesByList = async (req, res, next) => {
  try {
    const { name, desc } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Category name must be entered");
    }
    const category = await Category.findOne({
      idList: req.params.idList,
      name,
    });
    if (category) {
      res.status(404);
      throw new Error("Category name already exist");
    }
    const newCategory = await Category.create({
      idList: req.params.idList,
      name,
      desc,
    });
    if (newCategory) {
      res.status(200).json(newCategory);
    } else {
      res.status(400);
      throw new Error("Category can not be created");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete all categories by idList
// @route   DELETE /api/categories/list/:idList
// @access  Private
export const deleteCategoriesByList = async (req, res, next) => {
  try {
    const removed = await Category.remove({ idList: req.params.idList });
    if (removed) {
      res.status(200).json({ message: "Categories removed" });
    } else {
      res.status(404).json({ message: "Categories not found" });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch category by id
// @route   GET /api/categories/:idCategory
// @access  Public
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.idCategory);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Update category by id
// @route   PUT /api/categories/:idCategory
// @access  Private
export const updateCategoryById = async (req, res, next) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.idCategory,
      { $set: req.body },
      { new: true }
    );
    if (updated) {
      res.status(200).json(updated);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category by id
// @route   DELETE /api/categories/:idCategory
// @access  Private
export const deleteCategoryById = async (req, res, next) => {
  try {
    const removed = await Category.findByIdAndRemove(req.params.idCategory);
    if (removed) {
      res.status(200).json({ message: "Category removed" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    next(error);
  }
};
