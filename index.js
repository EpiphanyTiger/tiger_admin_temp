import AdminJS from "adminjs";
import { Database, Resource } from "@adminjs/sequelize";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import cors from "cors";
import { sequelize, User, Product, Order } from "./models/models.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Register Sequelize adapter
AdminJS.registerAdapter({ Database, Resource });

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
  })
);

const initializeAdmin = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const adminJs = new AdminJS({
      resources: [
        { resource: User, options: { parent: { name: "Database" } } },
        { resource: Product, options: { parent: { name: "Database" } } },
        { resource: Order, options: { parent: { name: "Database" } } },
      ],
      rootPath: "/admin",
      branding: {
        companyName: "Tiger Analytics",
        logo: "./logo.png", // ✅ Update with Tiger Analytics Logo
        favicon: "https://www.tigeranalytics.com/wp-content/uploads/2022/11/favicon.ico", // ✅ Favicon

        // ✅ Custom Theme Colors (from Tiger Analytics)
        theme: {
          colors: {
            primary100: "#002147", // Dark Blue
            primary80: "#003366",
            primary60: "#004080",
            primary40: "#00509E",
            primary20: "#0084CE",
            grey100: "#333333",
            grey80: "#4F4F4F",
            grey60: "#828282",
            grey40: "#BDBDBD",
            grey20: "#E0E0E0",
            accent: "#F36F21", // Orange from Tiger Analytics website
          },
          typography: {
            fontFamily: `"Roboto", sans-serif`, // ✅ Match Tiger's typography
            fontWeight: "400",
          },
        },

        // ✅ Customize Layout Text
        loginPage: {
          backgroundImage: "https://www.tigeranalytics.com/wp-content/uploads/2023/07/hero-image-1.jpg", // ✅ Background Image
          welcomeMessage: "Welcome to Tiger Analytics Admin Panel",
        },
      },
    });

    // ✅ Secure AdminJS with authentication
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      adminJs,
      {
        authenticate: async (email, password) => {
          const user = await User.findOne({ where: { email } });
          if (!user) return null;
          const isMatch = await bcrypt.compare(password, user.password);
          return isMatch ? user : null;
        },
        cookieName: "adminjs",
        cookiePassword: process.env.SESSION_SECRET || "supersecret",
      },
      null,
      {
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET || "supersecret",
      }
    );

    app.use(adminJs.options.rootPath, adminRouter);
  } catch (error) {
    console.error("Error initializing AdminJS:", error);
  }
};

initializeAdmin();

export default app;
