import express from "express";
const itemRouter = express.Router();

import auth from "../middleware/authMiddleware";
import cors from "../middleware/corsMiddleware";

import {
  corsItems,
  getItems,
  createItem,
  deleteItems,
  getItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/itemController";

itemRouter
  .route("/")
  .options(cors.corsWithOptions, corsItems)
  .get(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, getItems)
  .post(cors.corsWithOptions, auth.verifyUser, createItem)
  .delete(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, deleteItems);

itemRouter
  .route("/itemId")
  .options(cors.corsWithOptions, corsItems)
  .get(cors.cors, getItemById)
  .put(cors.corsWithOptions, auth.verifyUser, updateItemById)
  .delete(cors.corsWithOptions, auth.verifyUser, deleteItemById);

export default itemRouter;
