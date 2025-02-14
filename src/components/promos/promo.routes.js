const express = require("express");
const router = express.Router();
const PromoController = require("../promos/promo.controller");
const authorize = require("../../middlewares/auth.middleware");
const uploadPromoImage = require("../../multer/promos.multer");

router.post("/api/promo", authorize("admin-jwt"), uploadPromoImage, async (req, res, next) => {
  PromoController.postPromo(req, res, next);
});

router.get("/api/promo", async (req, res, next) => {
  PromoController.getPromos(req, res, next);
})

router.put("/api/promo/:idpromo", authorize("admin-jwt"), async (req, res, next) => {
  PromoController.updatePromo(req, res, next);
});

router.delete("/api/promo/:idpromo", authorize("admin-jwt"), async (req, res, next) => {
  PromoController.deletePromo(req, res, next);
});

module.exports = router