const prisma = require("../../prisma/client.js");

const AuthQuery = {
  getAdminByEmail: async (email) => {
    return await prisma.admins.findUnique({
      where: { email },
    });
  },

  isRefreshTokenExists: async (refresh_token) => {
    const count = await prisma.authentications.count({
      where: { refresh_token },
    });
    return count > 0;
  },

  addRefreshTokenForUser: async (id, refresh_token) => {
    await prisma.authentications.upsert({
      where: { id },
      update: { refresh_token },
      create: { id , refresh_token },
    });
  },

  deleteRefreshToken: async (refresh_token) => {
    await prisma.authentications.deleteMany({
      where: { refresh_token },
    });
  },

  updateRefreshTokenForLogin: async (id, refresh_token) => {
    await prisma.authentications.update({
      where: { id },
      data: { refresh_token },
    });
  },

  isValidAdmin: async (id) => {
    const count = await prisma.admins.count({
      where: { id },
    });
    return count > 0;
  },

  addAdmin: async (email, password) => {
    return await prisma.admins.create({
      data: {
        email,
        password,
      },
    });
  },
};

module.exports = AuthQuery;
