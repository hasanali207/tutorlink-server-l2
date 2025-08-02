import express from "express";
import { reviewControllers } from "./review.controller";

const router = express.Router();

router.post("/",reviewControllers.createReview); // Add review
router.get("/:tutorId", reviewControllers.getReview); // Get all reviews for a tutor

export const ReviewRoutes = router;