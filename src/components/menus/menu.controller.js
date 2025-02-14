const MenuService = require("../menus/menu.services");

const MenuController = {
  getMenus: async (req, res, next) => {
    try {
      const result = await MenuService.getMenus(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  postMenu: async (req, res, next) => {
    try {
      const result = await MenuService.postMenu(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  updateMenu: async (req, res, next) => {
    try {
      const result = await MenuService.updateMenu(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteMenu: async (req, res, next) => {
    try {
      const result = await MenuService.deleteMenu(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = MenuController;
