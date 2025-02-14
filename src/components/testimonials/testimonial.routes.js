const express = require("express");
const router = express.Router();
const TestimonialController = require("../testimonials/testimonial.controller");
const authorize = require("../../middlewares/auth.middleware");
const uploadTestimonialImage = require("../../multer/testimonials.multer");

router.post("/api/testimonial", uploadTestimonialImage, async (req, res, next) => {
  TestimonialController.postTestimonial(req, res, next);
});

router.get("/api/testimonial", async (req, res, next) => {
  TestimonialController.getTestimonials(req, res, next);
})

router.put("/api/testimonial/:idtestimonial", authorize("admin-jwt"), async (req, res, next) => {
  TestimonialController.approveTestimonial(req, res, next);
});

router.delete("/api/testimonial/:idtestimonial", authorize("admin-jwt"), async (req, res, next) => {
  TestimonialController.deleteTestimonial(req, res, next);
});

module.exports = router