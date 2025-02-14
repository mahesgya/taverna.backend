const TestimonialQuery = require("../../databases/testimonials.query");
const { BadRequestError, NotFoundError } = require("../../errors/custom.errors");
const fs = require("fs");
const path = require("path");

const TestimonialService = {
  getTestimonials: async () => {
    return await TestimonialQuery.getTestimonials();
  },
  postTestimonial: async (req) => {
    const { name, jobTitle, description } = req.body;

    if (!name || !jobTitle || !description) {
      throw new BadRequestError("Data Tidak Lengkap.");
    }

    if (!req.file.filename) {
      throw new BadRequestError("Gambar testimonial harus diunggah.");
    }

    const filepath = `${req.file.filename}`;

    return await TestimonialQuery.postTestimonial(name, jobTitle, description, filepath);
  },

  approveTestimonial: async (req) => {
    const { idtestimonial } = req.params;
    const { option } = req.body;

    if (typeof option !== "boolean") {
        throw new BadRequestError("Option harus berupa boolean (true atau false).");
    }

    const testimonialExists = await TestimonialQuery.findTestimonial(idtestimonial);
    if (!testimonialExists) throw new NotFoundError("Testimonial Tidak Ditemukan.");

    return await TestimonialQuery.approveTestimonial(idtestimonial, option);
  },
  deleteTestimonial: async (req) => {
    const { idtestimonial } = req.params;
    if (!idtestimonial) throw new BadRequestError("Id Testimonial Di Perlukan.");

    const testimonialExists = await TestimonialQuery.findTestimonial(idtestimonial);
    if (!testimonialExists) throw new NotFoundError("Testimonial Tidak Ditemukan.");

    const filepath = testimonialExists.filepath;

    if (filepath) {
      const filePathToDelete = path.join(__dirname, "..", "..", "..", "storage", "testimonial", filepath);

      fs.unlink(filePathToDelete, (err) => {
        if (err) console.error("Gagal menghapus file:", err);
      });
    }

    return await TestimonialQuery.deleteTestimonial(idtestimonial);
  },
};

module.exports = TestimonialService;
