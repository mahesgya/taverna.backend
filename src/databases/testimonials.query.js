const prisma = require("../../prisma/client");

const TestimonialQuery = {
  getTestimonials: async () => {
    return await prisma.testimonials.findMany({});
  },
  postTestimonial: async (name, jobTitle, description, filepath) => {
    return await prisma.testimonials.create({
      data: {
        name,
        jobTitle,
        description,
        filepath,
      },
    });
  },
  approveTestimonial: async (idtestimonial, option) => {
    return await prisma.testimonials.update({
      where: { id: idtestimonial },
      data: {
        option,
      }
    });
  },
  deleteTestimonial: async (idtestimonial) => {
    return await prisma.testimonials.delete({
      where: { id: idtestimonial },
    });
  },
  findTestimonial: async (idtestimonial) => {
    return await prisma.testimonials.findUnique({ where: { id: idtestimonial } });
  },
};

module.exports = TestimonialQuery;
