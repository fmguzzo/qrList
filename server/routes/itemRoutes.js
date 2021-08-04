import express from "express";
const itemRouter = express.Router();

import auth from "../middleware/authMiddleware";
import cors from "../middleware/corsMiddleware";

import {
  getItemsByCategory,
  createItemByCategory,
  getItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/itemController";

import corsResponse from "../controllers/corsController";

itemRouter
  .route("/category/:idCategory")
  .options(cors.corsWithOptions, corsResponse)
  .get(cors.corsWithOptions, getItemsByCategory)
  .post(cors.corsWithOptions, auth.verifyUser, createItemByCategory);

itemRouter
  .route("/:idItem")
  .options(cors.corsWithOptions, corsResponse)
  .get(cors.cors, getItemById)
  .put(cors.corsWithOptions, auth.verifyUser, updateItemById)
  .delete(cors.corsWithOptions, auth.verifyUser, deleteItemById);

export default itemRouter;
