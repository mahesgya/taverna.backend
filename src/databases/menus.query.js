const prisma = require("../../prisma/client");
const {BadRequestError} = require("../errors/custom.errors")

const MenuQuery = {
  getMenus: async () => {
    return await prisma.menus.findMany({});
  },
  postMenu: async (category, name, description, filepath) => {
    return await prisma.menus.create({
      data: {
        category,
        name,
        description,
        filepath,
      },
    });
  },
  updateMenu: async (idmenu, data) => {
    return await prisma.menus.update({
      where: { id: idmenu },
      data,
    });
  },
  deleteMenu: async (idmenu) => {
    return await prisma.menus.delete({
      where: { id: idmenu },
    });
  },
  findMenu: async (idmenu) => {
    return await prisma.menus.findUnique({ where: { id : idmenu } });
  }
};

module.exports = MenuQuery;
