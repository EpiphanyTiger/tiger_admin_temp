import app from "./index.js";
import { sequelize } from "./models/models.js"; // ✅ Correct import

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // ✅ Auto-sync models
    console.log("Database connected successfully!");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`AdminJS running on http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
