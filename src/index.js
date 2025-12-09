import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

// Rotas
import userRoutes from "./routes/userRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import fleetRoutes from "./routes/fleetRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import authUserRoutes from "./routes/authUserRoutes.js";
import authManagerRoutes from "./routes/authManagerRoutes.js";

// Load .env antes de tudo
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "1mb" })); // evita payload gigante

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Copybus API is running 🚍",
    status: "OK",
    version: "1.0.0"
  });
});

app.use("/api/auth/user", authUserRoutes);
app.use("/api/auth/manager", authManagerRoutes);

app.use("/api/users", userRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/fleets", fleetRoutes);
app.use("/api/drivers", driverRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada"
  });
});

app.use((err, req, res, next) => {
  console.error("🔥 ERRO GLOBAL", err);

  res.status(500).json({
    success: false,
    message: "Erro interno do servidor"
  });
});

app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 SERVER IS RUNNING ON PORT ${PORT}`);
  console.log("=================================");
});
