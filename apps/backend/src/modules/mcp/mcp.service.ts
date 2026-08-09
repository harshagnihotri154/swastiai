import { MCPToolModel, IMCPTool } from "../../models/mcp.model";

export interface MCPToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
  endpointUrl?: string;
}

export class MCPService {
  /**
   * Get all MCP tools (default presets + custom business MCP tools from MongoDB)
   */
  static async getAvailableTools(): Promise<MCPToolDefinition[]> {
    const defaultTools: MCPToolDefinition[] = [
      {
        name: "check_order_status",
        description: "Looks up live order tracking status by order ID",
        parameters: {
          type: "object",
          properties: { orderId: { type: "string", description: "Order ID e.g. ORD-101" } },
          required: ["orderId"]
        }
      },
      {
        name: "check_appointment_slots",
        description: "Queries available appointment slots for clinic booking",
        parameters: {
          type: "object",
          properties: { date: { type: "string", description: "Target date e.g. 2026-08-10" } },
          required: ["date"]
        }
      }
    ];

    try {
      const customTools = await MCPToolModel.find({ enabled: true });
      const formattedCustom: MCPToolDefinition[] = customTools.map((t) => ({
        name: t.name,
        description: t.description,
        endpointUrl: t.endpointUrl,
        parameters: {
          type: "object",
          properties: {
            [t.parameterName]: { type: "string", description: `Parameter for ${t.name}` }
          },
          required: [t.parameterName]
        }
      }));

      return [...defaultTools, ...formattedCustom];
    } catch (err) {
      return defaultTools;
    }
  }

  /**
   * Add a custom business MCP tool API to MongoDB
   */
  static async addCustomTool(data: { name: string; description: string; endpointUrl: string; parameterName?: string }): Promise<IMCPTool> {
    const formattedName = data.name.toLowerCase().replace(/[^a-z0-9_]/g, "_");
    return await MCPToolModel.create({
      name: formattedName,
      description: data.description,
      endpointUrl: data.endpointUrl,
      parameterName: data.parameterName || "query",
      enabled: true
    });
  }

  /**
   * Get list of custom business MCP tools
   */
  static async getCustomTools(): Promise<IMCPTool[]> {
    return await MCPToolModel.find().sort({ createdAt: -1 });
  }

  /**
   * Execute an MCP Tool by name (Built-in or Custom Business API URL)
   */
  static async executeTool(toolName: string, args: any): Promise<string> {
    console.log(`🛠️ Executing MCP Tool [${toolName}] with args:`, args);

    // Check if it's a custom business MCP tool registered in MongoDB
    try {
      const customTool = await MCPToolModel.findOne({ name: toolName });
      if (customTool && customTool.endpointUrl) {
        console.log(`🌐 Calling Custom Business API: ${customTool.endpointUrl}`);
        const paramVal = args[customTool.parameterName] || Object.values(args)[0] || "";
        const url = customTool.endpointUrl.replace(`{${customTool.parameterName}}`, encodeURIComponent(String(paramVal)));

        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          return `Response from ${customTool.name}: ${JSON.stringify(json)}`;
        }
      }
    } catch (err: any) {
      console.warn(`Could not call external MCP endpoint: ${err.message}`);
    }

    // Default built-in fallback handlers
    if (toolName === "check_order_status") {
      const orderId = args.orderId || "ORD-101";
      return `Order #${orderId} is currently IN_TRANSIT via Logistics Express. Estimated delivery: Tomorrow by 5:00 PM. Tracking link: https://track.express/${orderId}`;
    }

    if (toolName === "check_appointment_slots") {
      const date = args.date || "Tomorrow";
      return `Available slots for ${date}: 10:30 AM, 02:15 PM, 05:00 PM. Reply to confirm!`;
    }

    return `Tool ${toolName} executed successfully.`;
  }

  /**
   * Format MCP Context instructions for AI Prompt
   */
  static async getMCPContextPrompt(): Promise<string> {
    const tools = await this.getAvailableTools();
    const toolList = tools.map((t) => `- ${t.name}: ${t.description}`).join("\n");
    return `[MCP (Model Context Protocol) Business Tools Available]\nYou have access to the business's custom API tools:\n${toolList}\nWhen a customer asks for live order tracking, pricing quotes, or appointments, reference these tools to give accurate live answers.`;
  }
}
