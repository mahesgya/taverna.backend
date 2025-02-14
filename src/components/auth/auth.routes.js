const express = require("express");
const router = express.Router();
const AuthController = require("../auth/auth.controller");
const passport = require("passport");

//Auth

router.post("/api/admin/login", async (req, res, next) => {
  AuthController.loginAdmin(req, res, next);
});

router.get("/api/admin/status", passport.authenticate("admin-jwt", { session: false }), (req, res) => {
  res.status(200).json({
    message: "User is authenticated!",
  });
});

router.put("/api/admin/refresh", async (req, res, next) => {
  AuthController.refreshAdmin(req, res, next);
});

router.post("/api/admin/logout", async (req, res, next) => {
  AuthController.logoutAdmin(req, res, next);
});

// Add Admin

router.post("/api/add/admin", async (req, res, next) => {
  AuthController.addAdmin(req, res, next);
});

module.exports = router;
