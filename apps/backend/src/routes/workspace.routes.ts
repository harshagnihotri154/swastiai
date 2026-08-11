import { Router } from "express";
import { WorkspaceModel } from "../models/workspace.model";
import { AgentConfigModel } from "../models/agent.model";

const router = Router();

// GET /api/v1/workspace/current - Fetch active business workspace & AI agent details
router.get("/current", async (_req, res) => {
  try {
    let workspace = await WorkspaceModel.findOne();
    if (!workspace) {
      workspace = await WorkspaceModel.create({
        businessName: "Sharma Properties",
        category: "Real Estate",
        description: "We help customers find residential properties in Noida and Greater Noida.",
        location: "Sector 18, Noida",
        contactPhone: "+91-9084553059"
      });
    }

    let agent = await AgentConfigModel.findOne({ isDefault: true });
    if (!agent) {
      agent = await AgentConfigModel.create({
        workspaceId: workspace._id,
        agentName: "Swasti",
        role: "Sales Assistant",
        systemPrompt: "You are Swasti, an official AI Sales Assistant on WhatsApp for Sharma Properties. Help customers find properties and schedule site visits.",
        isDefault: true
      });
    }

    res.json({
      success: true,
      data: {
        workspace,
        agent
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/v1/workspace/setup - Complete Zero-Code Onboarding Setup
router.post("/setup", async (req, res) => {
  try {
    const {
      businessName,
      category,
      description,
      website,
      location,
      contactEmail,
      contactPhone,
      agentName,
      role,
      personality,
      instructions
    } = req.body;

    let workspace = await WorkspaceModel.findOne();
    if (!workspace) {
      workspace = new WorkspaceModel();
    }

    if (businessName) workspace.businessName = businessName;
    if (category) workspace.category = category;
    if (description) workspace.description = description;
    if (website) workspace.website = website;
    if (location) workspace.location = location;
    if (contactEmail) workspace.contactEmail = contactEmail;
    if (contactPhone) workspace.contactPhone = contactPhone;

    await workspace.save();

    let agent = await AgentConfigModel.findOne({ isDefault: true });
    if (!agent) {
      agent = new AgentConfigModel({ isDefault: true });
    }

    agent.workspaceId = workspace._id;
    if (agentName) agent.agentName = agentName;
    if (role) agent.role = role;
    if (contactPhone) agent.userPhoneNumber = contactPhone;

    const formattedPrompt = `You are ${agentName || "Swasti"}, an AI ${role || "Sales Assistant"} for ${businessName || "our business"}.\n\nBusiness Category: ${category || "General Services"}\nDescription: ${description || ""}\nLocation: ${location || ""}\n\nPersonality & Tone: ${personality || "Professional, friendly, and helpful"}\n\nInstructions: ${instructions || "Help customers find information, qualify leads, and schedule visits."}`;

    agent.systemPrompt = formattedPrompt;
    await agent.save();

    res.json({
      success: true,
      message: `🎉 Workspace and AI Employee "${agent.agentName}" setup completed successfully!`,
      data: {
        workspace,
        agent
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
