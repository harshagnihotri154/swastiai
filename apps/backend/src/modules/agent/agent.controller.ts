import { Response } from "express";
import { AgentConfigModel } from "../../models/agent.model";
import { AuthRequest } from "../../middleware/auth.middleware";

export class AgentController {
  /**
   * GET /api/v1/agent/config - Fetch current user's agent settings from MongoDB
   */
  static async getConfig(req: AuthRequest, res: Response): Promise<any> {
    try {
      let config = await AgentConfigModel.findOne({ userId: req.userId });

      if (!config) {
        // Fallback default config
        config = await AgentConfigModel.findOne({ isDefault: true });
      }

      return res.status(200).json({
        success: true,
        data: config
      });
    } catch (error: any) {
      console.error("Error in getConfig controller:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * PUT /api/v1/agent/config - Save or update user's agent settings in MongoDB
   */
  static async updateConfig(req: AuthRequest, res: Response): Promise<any> {
    try {
      const { agentName, systemPrompt, model, aiModel, temperature, provider, interaktApiKey, whatsappToken, phoneNumberId } = req.body;

      let config = await AgentConfigModel.findOne({ userId: req.userId });

      const targetModel = aiModel || model || "groq-llama-3.3-70b";

      if (!config) {
        config = new AgentConfigModel({
          userId: req.userId,
          agentName,
          systemPrompt,
          aiModel: targetModel,
          temperature,
          provider: provider || "meta",
          interaktApiKey,
          whatsappToken,
          phoneNumberId
        });
      } else {
        if (agentName !== undefined) config.agentName = agentName;
        if (systemPrompt !== undefined) config.systemPrompt = systemPrompt;
        if (targetModel !== undefined) config.aiModel = targetModel;
        if (temperature !== undefined) config.temperature = temperature;
        if (provider !== undefined) config.provider = provider;
        if (interaktApiKey !== undefined) config.interaktApiKey = interaktApiKey;
        if (whatsappToken !== undefined) config.whatsappToken = whatsappToken;
        if (phoneNumberId !== undefined) config.phoneNumberId = phoneNumberId;
      }

      await config.save();

      return res.status(200).json({
        success: true,
        message: "Agent configuration saved successfully",
        data: config
      });
    } catch (error: any) {
      console.error("Error in updateConfig controller:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
