const MenuQuery = require("../../databases/menus.query");
const { BadRequestError, NotFoundError } = require("../../errors/custom.errors");
const fs = require("fs");
const path = require("path");

const MenuService = {
  getMenus: async () => {
    return await MenuQuery.getMenus();
  },
  postMenu: async (req) => {
    const { category, name, description } = req.body;

    if (!category || !name || !description) {
      throw new BadRequestError("Data Tidak Lengkap.");
    }

    if (!req.file.filename) {
      throw new BadRequestError("Gambar menu harus diunggah.");
    }

    const filepath = `${req.file.filename}`;

    return await MenuQuery.postMenu(category, name, description, filepath);
  },

  updateMenu: async (req) => {
    const { idmenu } = req.params;
    const { ...data } = req.body;

    const menuExists = await MenuQuery.findMenu(idmenu);
    if (!menuExists) throw new NotFoundError("Menu Tidak Ditemukan.");

    if (Object.keys(data).length === 0) {
      throw new BadRequestError("Minimal Ada Satu Data yang Di Kirimkan.");
    }

    return await MenuQuery.updateMenu(idmenu, data);
  },
  deleteMenu: async (req) => {
    const { idmenu } = req.params;
    if (!idmenu) throw new BadRequestError("Id Menu Di Perlukan.");

    const menuExists = await MenuQuery.findMenu(idmenu);
    if (!menuExists) throw new NotFoundError("Menu Tidak Ditemukan.");

    const filepath = menuExists.filepath;

    if (filepath) {
      const filePathToDelete = path.join(__dirname, "..", "..", "..", "storage", "menu", filepath);
      
      fs.unlink(filePathToDelete, (err) => {
        if (err) console.error("Gagal menghapus file:", err);
      });
    }

    return await MenuQuery.deleteMenu(idmenu);
  },
};

module.exports = MenuService;
