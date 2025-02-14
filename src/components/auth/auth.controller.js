const AuthService = require("../auth/auth.services");

const AuthController = {
  loginAdmin: async (req, res, next) => {
    try {
      const result = await AuthService.loginAdmin(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  logoutAdmin: async (req, res, next) => {
    try {
      const result = await AuthService.logoutAdmin(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  refreshAdmin: async (req, res, next) => {
    try {
      const result = await AuthService.refresh(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  addAdmin: async (req, res, next) => {
    try {
      const result = await AuthService.addAdmin(req);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
