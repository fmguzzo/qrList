import express from "express";
const siteRouter = express.Router();

const auth = require("../middleware/authMiddleware");
const cors = require("../middleware/corsMiddleware");

import {
  corsSites,
  getSites,
  createSite,
  deleteSites,
  getSiteById,
  updateSiteById,
  deleteSiteById,
} from "../controllers/siteController";

siteRouter
  .route("/")
  .options(cors.corsWithOptions, corsSites)
  .get(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, getSites)
  .post(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, createSite)
  .delete(cors.corsWithOptions, auth.verifyUser, auth.verifyAdmin, deleteSites);

siteRouter
  .route("/:siteId")
  .options(cors.corsWithOptions, corsSites)
  .get(cors.corsWithOptions, getSiteById)
  .put(cors.corsWithOptions, auth.verifyUser, updateSiteById)
  .delete(cors.corsWithOptions, auth.verifyUser, deleteSiteById);

export default siteRouter;
