const { AuthenticationError, BadRequestError } = require("../../errors/custom.errors");
const AuthSchema = require("../../validators/auth.schema");
const AuthQuery = require("../../databases/auth.query.js");
const validate = require("../../validators/validator");
const TokenService = require("../token/token.service.js");
const bcrypt = require("bcryptjs");

const AdminService = {
  loginAdmin: async (req) => {
    const credentials = validate(AuthSchema.login, req.body);

    const admin = await AuthQuery.getAdminByEmail(credentials.email);
    if (!admin) throw new AuthenticationError("Login gagal, akun tidak ditemukan.");

    const isPasswordMatch = await bcrypt.compare(credentials.password, admin.password);
    if (!isPasswordMatch) throw new AuthenticationError("Login gagal, password salah.");

    const { id, email } = admin;

    const accessToken = TokenService.generateAccessToken(id, email);
    const refreshToken = TokenService.generateRefreshToken(id, email);

    try {
      await AuthQuery.addRefreshTokenForUser(id, refreshToken);
    } catch (e) {
      console.log(e);
      try {
        await AuthQuery.updateRefreshTokenForLogin(id, refreshToken);
      } catch (e) {}
    }

    return { accessToken, refreshToken };
  },

  logoutAdmin: async (req) => {
    const { refresh_token: refreshToken } = validate(AuthSchema.logout, req.body);

    const isRefreshTokenExists = await AuthQuery.isRefreshTokenExists(refreshToken);

    if (!isRefreshTokenExists || isRefreshTokenExists == 0) throw new AuthenticationError("Invalid refresh token");

    await AuthQuery.deleteRefreshToken(refreshToken);

    return "Logout berhasil.";
  },

  refresh: async (req) => {
    const { refresh_token: refreshToken } = validate(AuthSchema.refresh, req.body);

    const isRefreshTokenExists = await AuthQuery.isRefreshTokenExists(refreshToken);
    if (!isRefreshTokenExists) throw new AuthenticationError("Invalid refresh token");

    const { id, email } = TokenService.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    let newAccessToken = TokenService.generateAccessToken(id, email);
    let newRefreshToken = TokenService.generateRefreshToken(id, email);

    await AuthQuery.updateRefreshTokenForLogin(id, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  addAdmin: async (req) => {
    const { email, password } = req.body;

    if (!email || !password) throw new BadRequestError("Data Tidak Lengkap");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AuthQuery.addAdmin(email, hashedPassword);

    return newAdmin;
  },
};

module.exports = AdminService;
