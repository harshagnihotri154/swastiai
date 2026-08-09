import { Request, Response } from "express";
import { MCPService } from "./mcp.service";

export class MCPController {
  /**
   * GET /api/v1/mcp/tools - List all available MCP tools
   */
  static async list(_req: Request, res: Response): Promise<any> {
    try {
      const tools = await MCPService.getAvailableTools();
      const custom = await MCPService.getCustomTools();
      return res.status(200).json({ success: true, data: tools, custom });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * POST /api/v1/mcp/tools - Add custom business MCP tool API
   */
  static async create(req: Request, res: Response): Promise<any> {
    try {
      const { name, description, endpointUrl, parameterName } = req.body;
      if (!name || !endpointUrl) {
        return res.status(400).json({ success: false, error: "Tool name and Endpoint URL are required" });
      }

      const tool = await MCPService.addCustomTool({
        name,
        description: description || `Custom API for ${name}`,
        endpointUrl,
        parameterName: parameterName || "orderId"
      });

      return res.status(201).json({ success: true, data: tool });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
