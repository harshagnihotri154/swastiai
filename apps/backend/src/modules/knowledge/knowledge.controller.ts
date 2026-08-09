import { Request, Response } from "express";
import { KnowledgeService } from "./knowledge.service";

export class KnowledgeController {
  /**
   * GET /api/v1/knowledge - List all knowledge items
   */
  static async list(req: Request, res: Response): Promise<any> {
    try {
      const items = await KnowledgeService.getKnowledgeItems();
      return res.status(200).json({ success: true, data: items });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * POST /api/v1/knowledge - Create new knowledge item
   */
  static async create(req: Request, res: Response): Promise<any> {
    try {
      const { title, content, type } = req.body;
      if (!title || !content) {
        return res.status(400).json({ success: false, error: "Title and content are required" });
      }

      const item = await KnowledgeService.addKnowledgeItem({ title, content, type: type || "faq" });
      return res.status(201).json({ success: true, data: item });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * DELETE /api/v1/knowledge/:id - Delete knowledge item
   */
  static async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id as string;
      const success = await KnowledgeService.deleteKnowledgeItem(id);
      return res.status(200).json({ success, message: success ? "Item deleted" : "Item not found" });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
