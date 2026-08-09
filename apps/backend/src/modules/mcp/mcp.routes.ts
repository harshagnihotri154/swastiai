import { Router } from "express";
import { MCPController } from "./mcp.controller";

const router = Router();

router.get("/tools", MCPController.list);
router.post("/tools", MCPController.create);

export default router;
