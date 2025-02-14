const prisma = require("../../prisma/client");

const PromoQuery = {
  getPromos: async () => {
    return await prisma.promos.findMany({});
  },
  postPromo: async (title, description, start_date, end_date, filepath) => {
    return await prisma.promos.create({
      data: {
        title,
        description,
        start_date,
        end_date,
        filepath,
      },
    });
  },
  updatePromo: async (idpromo, data) => {
    return await prisma.promos.update({
      where: { id: idpromo },
      data,
    });
  },
  deletePromo: async (idpromo) => {
    return await prisma.promos.delete({
      where: { id: idpromo },
    });
  },
  findPromo: async (idpromo) => {
    return await prisma.promos.findUnique({ where: { id: idpromo } });
  },
};

module.exports = PromoQuery;
