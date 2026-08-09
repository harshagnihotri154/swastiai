import { Router } from "express";
import { AgentController } from "./agent.controller";
import { authenticateJwt } from "../../middleware/auth.middleware";

const router = Router();

router.get("/config", authenticateJwt, AgentController.getConfig);
router.put("/config", authenticateJwt, AgentController.updateConfig);

export default router;
