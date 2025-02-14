const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const AuthRouter = require("../src/components/auth/auth.routes")
const MenuRouter = require("../src/components/menus/menu.routes")
const PromoRouter = require("../src/components/promos/promo.routes")
const TestimonialRouter = require("../src/components/testimonials/testimonial.routes")


const errorHandler = require("./middlewares/error.middleware.js")
require("dotenv").config();
require("./auth/passport");

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.BASE_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

app.use(AuthRouter)
app.use(MenuRouter)
app.use(PromoRouter)
app.use(TestimonialRouter)

app.use(errorHandler)

module.exports = app;
