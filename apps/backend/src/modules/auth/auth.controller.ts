import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/user.model";
import { AgentConfigModel } from "../../models/agent.model";
import { env } from "../../config/env";
import { AuthRequest } from "../../middleware/auth.middleware";

export class AuthController {
  /**
   * POST /api/v1/auth/signup - Register new SaaS user
   */
  static async signup(req: Request, res: Response): Promise<any> {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required" });
      }

      const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        email: email.toLowerCase(),
        passwordHash,
        name: name || ""
      });

      // Create default AgentConfig for user
      await AgentConfigModel.create({
        userId: user._id,
        agentName: `${name || "My"} AI Business Agent`,
        systemPrompt: env.DEFAULT_SYSTEM_PROMPT,
        aiModel: "groq-llama-3.3-70b",
        temperature: 0.7,
        isDefault: true
      });

      const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, { expiresIn: "30d" });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error: any) {
      console.error("Error in signup controller:", error);
      return res.status(500).json({ success: false, error: error.message || "Signup failed" });
    }
  }

  /**
   * POST /api/v1/auth/login - Login user
   */
  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required" });
      }

      const user = await UserModel.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, { expiresIn: "30d" });

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error: any) {
      console.error("Error in login controller:", error);
      return res.status(500).json({ success: false, error: error.message || "Login failed" });
    }
  }

  /**
   * GET /api/v1/auth/me - Get logged in user profile
   */
  static async getMe(req: AuthRequest, res: Response): Promise<any> {
    try {
      const user = await UserModel.findById(req.userId).select("-passwordHash");
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      return res.status(200).json({
        success: true,
        user
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
