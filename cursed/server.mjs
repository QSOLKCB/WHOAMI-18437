import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

app.get("/api/v1/trent/status", (_req, res) => {
  res.json({
    apiVersion: "2026-08-14",
    model: "trent-v1983-flash-think-qsol-max",
    status: "OPERATIONAL",
    identity: "TRENT",
    wrappers: {
      react: true,
      typescript: true,
      wasm: true,
      kubernetes: true,
      necessity: false,
    },
  });
});

app.listen(process.env.PORT ?? 3000);
