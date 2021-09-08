import express from "express";
const uploadRouter = express.Router();

import auth from "../middleware/authMiddleware";
import cors from "../middleware/corsMiddleware";
import uploadMiddleware from "../middleware/uploadMiddleware";

import { uploadController } from "../controllers/uploadController";

import corsResponse from "../controllers/corsController";

uploadRouter.route("/").options(cors.corsWithOptions, corsResponse).post(
  cors.corsWithOptions,
  //auth.verifyUser,
  uploadMiddleware.single("imageFile"),
  uploadController
);

export default uploadRouter;
