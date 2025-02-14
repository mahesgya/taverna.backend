const TestimonialService = require("../testimonials/testimonial.services");

const TestimonialController = {
  getTestimonials: async (req, res, next) => {
    try {
      const result = await TestimonialService.getTestimonials(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  postTestimonial: async (req, res, next) => {
    try {
      const result = await TestimonialService.postTestimonial(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  approveTestimonial: async (req, res, next) => {
    try {
      const result = await TestimonialService.approveTestimonial(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteTestimonial: async (req, res, next) => {
    try {
      const result = await TestimonialService.deleteTestimonial(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TestimonialController;
