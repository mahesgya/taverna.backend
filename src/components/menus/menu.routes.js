const express = require("express");
const router = express.Router();
const MenuController = require("../menus/menu.controller");
const authorize = require("../../middlewares/auth.middleware");
const uploadMenuImage = require("../../multer/menus.multer");

router.post("/api/menu", authorize("admin-jwt"), uploadMenuImage, async (req, res, next) => {
  MenuController.postMenu(req, res, next);
});

router.get("/api/menu", async (req, res, next) => {
  MenuController.getMenus(req, res, next);
});

router.put("/api/menu/:idmenu", authorize("admin-jwt"), async (req, res, next) => {
  MenuController.updateMenu(req, res, next);
});

router.delete("/api/menu/:idmenu", authorize("admin-jwt"), async (req, res, next) => {
  MenuController.deleteMenu(req, res, next);
});

module.exports = router
