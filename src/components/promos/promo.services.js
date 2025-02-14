const PromoQuery = require("../../databases/promos.query");
const { BadRequestError, NotFoundError } = require("../../errors/custom.errors");
const fs = require("fs");
const path = require("path");

const PromoService = {
  getPromos: async () => {
    return await PromoQuery.getPromos();
  },
  postPromo: async (req) => {
    const { title, description, start_date, end_date } = req.body;

    if (!title || !description || !start_date || !end_date) {
      throw new BadRequestError("Data Tidak Lengkap.");
    }

    if (!req.file.filename) {
      throw new BadRequestError("Gambar promo harus diunggah.");
    }

    const filepath = `${req.file.filename}`;

    return await PromoQuery.postPromo(title, description, start_date, end_date, filepath);
  },

  updatePromo: async (req) => {
    const { idpromo } = req.params;
    const { ...data } = req.body;

    const promoExists = await PromoQuery.findPromo(idpromo);
    if (!promoExists) throw new NotFoundError("Promo Tidak Ditemukan.");

    if (Object.keys(data).length === 0) {
      throw new BadRequestError("Minimal Ada Satu Data yang Di Kirimkan.");
    }

    return await PromoQuery.updatePromo(idpromo, data);
  },
  deletePromo: async (req) => {
    const { idpromo } = req.params;
    if (!idpromo) throw new BadRequestError("Id Promo Di Perlukan.");

    const promoExists = await PromoQuery.findPromo(idpromo);
    if (!promoExists) throw new NotFoundError("Promo Tidak Ditemukan.");

    const filepath = promoExists.filepath;

    if (filepath) {
      const filePathToDelete = path.join(__dirname, "..", "..", "..", "storage", "promo", filepath);

      fs.unlink(filePathToDelete, (err) => {
        if (err) console.error("Gagal menghapus file:", err);
      });
    }

    return await PromoQuery.deletePromo(idpromo);
  },
};

module.exports = PromoService;
