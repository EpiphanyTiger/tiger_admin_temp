import { User, sequelize } from "./models/models.js";
import bcrypt from "bcrypt";

const createAdminUser = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const adminExists = await User.findOne({ where: { email: "admin@example.com" } });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10); // Default password
      await User.create({
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin user created!");
    } else {
      console.log("Admin user already exists!");
    }

    process.exit();
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
