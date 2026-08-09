import { Router } from "express";
import { KnowledgeController } from "./knowledge.controller";

const router = Router();

router.get("/", KnowledgeController.list);
router.post("/", KnowledgeController.create);
router.delete("/:id", KnowledgeController.delete);

export default router;
