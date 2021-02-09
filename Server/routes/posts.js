import express from "express";
import { getMovie, createMovie } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getMovie);
router.post("/", createMovie);

export default router;
