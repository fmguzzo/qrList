import express from "express";
const listRouter = express.Router();

const auth = require("../middleware/authMiddleware");
const cors = require("../middleware/corsMiddleware");

import {
  corsLists,
  getListsSite,
  createListBySite,
  getListById,
  updateListById,
  deleteListById,
} from "../controllers/listController";

listRouter
  .route("/:siteId/site")
  .options(cors.corsWithOptions, corsLists)
  .get(cors.corsWithOptions, auth.verifyUser, getListsSite)
  .post(cors.corsWithOptions, auth.verifyUser, createListBySite);

listRouter
  .route("/:listId")
  .options(cors.corsWithOptions, corsLists)
  .get(cors.corsWithOptions, getListById)
  .put(cors.corsWithOptions, auth.verifyUser, updateListById)
  .delete(cors.corsWithOptions, auth.verifyUser, deleteListById);

export default listRouter;
