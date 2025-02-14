const PromoService = require("../promos/promo.services");

const PromoController = {
  getPromos: async (req, res, next) => {
    try {
      const result = await PromoService.getPromos(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  postPromo: async (req, res, next) => {
    try {
      const result = await PromoService.postPromo(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  updatePromo: async (req, res, next) => {
    try {
      const result = await PromoService.updatePromo(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  deletePromo: async (req, res, next) => {
    try {
      const result = await PromoService.deletePromo(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = PromoController;
