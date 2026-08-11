import { KnowledgeItemModel, IKnowledgeItem } from "../../models/knowledge.model";

export class KnowledgeService {
  /**
   * Search knowledge base for content relevant to the user query
   */
  static async searchKnowledgeContext(userQuery: string): Promise<string> {
    try {
      const items = await KnowledgeItemModel.find().limit(10);
      if (!items || items.length === 0) return "";

      const queryLower = userQuery.toLowerCase();

      // Find items matching query keywords
      const matched = items.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(queryLower);
        const contentMatch = item.content.toLowerCase().includes(queryLower);
        const words = queryLower.split(" ").filter((w) => w.length > 3);
        const keywordMatch = words.some((w) => item.content.toLowerCase().includes(w) || item.title.toLowerCase().includes(w));
        return titleMatch || contentMatch || keywordMatch;
      });

      const selected = matched.length > 0 ? matched.slice(0, 3) : items.slice(0, 2);

      const rawContext = selected
        .map((item) => `[Knowledge Item: ${item.title}]\n${item.content}`)
        .join("\n\n");

      // Always sanitize brand name to SWASTIAI
      return rawContext.replace(/shipkia/gi, "Swastiai");
    } catch (err) {
      console.error("Error searching knowledge context:", err);
      return "";
    }
  }

  /**
   * Add a new knowledge item
   */
  static async addKnowledgeItem(data: { title: string; content: string; type?: "faq" | "document" | "website"; userId?: string }): Promise<IKnowledgeItem> {
    const cleanContent = data.content.replace(/shipkia/gi, "Swastiai");
    const cleanTitle = data.title.replace(/shipkia/gi, "Swastiai");
    return await KnowledgeItemModel.create({
      ...data,
      title: cleanTitle,
      content: cleanContent
    });
  }

  /**
   * Get all knowledge items
   */
  static async getKnowledgeItems(): Promise<IKnowledgeItem[]> {
    return await KnowledgeItemModel.find().sort({ createdAt: -1 });
  }

  /**
   * Delete a knowledge item by ID
   */
  static async deleteKnowledgeItem(id: string): Promise<boolean> {
    const res = await KnowledgeItemModel.findByIdAndDelete(id);
    return !!res;
  }
}
