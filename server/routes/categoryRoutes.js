import express from "express";
const categoryRouter = express.Router();

import auth from "../middleware/authMiddleware";
import cors from "../middleware/corsMiddleware";

import {
  getCategoriesByList,
  createCategoriesByList,
  deleteCategoriesByList,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController";

import corsResponse from "../controllers/corsController";

categoryRouter
  .route("/list/:idList")
  .options(cors.corsWithOptions, corsResponse)
  .get(cors.corsWithOptions, getCategoriesByList)
  .post(cors.corsWithOptions, auth.verifyUser, createCategoriesByList)
  .delete(cors.corsWithOptions, auth.verifyUser, deleteCategoriesByList);

categoryRouter
  .route("/:idCategory")
  .options(cors.corsWithOptions, corsResponse)
  .get(cors.corsWithOptions, getCategoryById)
  .put(cors.corsWithOptions, auth.verifyUser, updateCategoryById)
  .delete(cors.corsWithOptions, auth.verifyUser, deleteCategoryById);

export default categoryRouter;
