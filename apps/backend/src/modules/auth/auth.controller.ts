import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { UserModel } from "../../models/user.model";
import { AgentConfigModel } from "../../models/agent.model";
import { env } from "../../config/env";
import { AuthRequest } from "../../middleware/auth.middleware";

export class AuthController {
  /**
   * POST /api/v1/auth/send-otp - Dispatch 6-digit OTP code via email
   */
  static async sendOTP(req: Request, res: Response): Promise<any> {
    try {
      const { email, name } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, error: "Email address is required" });
      }

      const cleanEmail = email.toLowerCase().trim();
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minute expiry

      let user = await UserModel.findOne({ email: cleanEmail });
      if (!user) {
        user = new UserModel({
          email: cleanEmail,
          name: name || cleanEmail.split("@")[0],
          otp: otpCode,
          otpExpiresAt,
          isVerified: false
        });
      } else {
        user.otp = otpCode;
        user.otpExpiresAt = otpExpiresAt;
        if (name && !user.name) user.name = name;
      }

      await user.save();

      // Dispatch Email via Nodemailer
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const smtpUser = process.env.SMTP_USER || "";
      const smtpPass = process.env.SMTP_PASS || "";

      let emailSent = false;
      if (smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: { user: smtpUser, pass: smtpPass }
          });

          await transporter.sendMail({
            from: `"SwastiAI Security" <${smtpUser}>`,
            to: cleanEmail,
            subject: `🔒 ${otpCode} is your SwastiAI Login Verification Code`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 500px; border: 1px solid #cbd5e1; borderRadius: 12px;">
                <h2 style="color: #2563eb; margin-top: 0;">SwastiAI Login Code</h2>
                <p style="color: #475569; font-size: 0.95rem;">Enter the following 6-digit OTP code to log in to your account:</p>
                <div style="font-size: 2.2rem; font-weight: 900; letter-spacing: 0.2em; color: #0f172a; background: #f1f5f9; padding: 16px; text-align: center; border-radius: 10px; margin: 20px 0;">
                  ${otpCode}
                </div>
                <p style="color: #64748b; font-size: 0.8rem;">This code will expire in 10 minutes. If you did not request this login, please ignore this email.</p>
              </div>
            `
          });
          emailSent = true;
          console.log(`📧 OTP Email dispatched to ${cleanEmail} via SMTP!`);
        } catch (mailErr: any) {
          console.warn(`📧 Nodemailer notice (SMTP config required): ${mailErr.message}`);
        }
      } else {
        console.log(`🔑 [DEV MODE] OTP Code for ${cleanEmail}: ${otpCode}`);
      }

      return res.status(200).json({
        success: true,
        message: emailSent
          ? `Verification code sent to ${cleanEmail}`
          : `Verification code generated for ${cleanEmail}. (Check server console or configure SMTP in .env)`,
        devOtp: !smtpUser || !smtpPass ? otpCode : undefined
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  /**
   * POST /api/v1/auth/verify-otp - Verify 6-digit OTP and issue JWT session
   */
  static async verifyOTP(req: Request, res: Response): Promise<any> {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ success: false, error: "Email and OTP code are required" });
      }

      const cleanEmail = email.toLowerCase().trim();
      const user = await UserModel.findOne({ email: cleanEmail });

      if (!user || !user.otp || user.otp !== otp.trim()) {
        return res.status(400).json({ success: false, error: "Invalid OTP verification code" });
      }

      if (user.otpExpiresAt && new Date() > new Date(user.otpExpiresAt)) {
        return res.status(400).json({ success: false, error: "OTP verification code has expired. Please request a new code." });
      }

      // Mark verified & clear OTP
      user.isVerified = true;
      user.otp = "";
      await user.save();

      // Ensure user has default agent config
      let agentConfig = await AgentConfigModel.findOne({ userId: user._id });
      if (!agentConfig) {
        await AgentConfigModel.create({
          userId: user._id,
          agentName: `${user.name || "My"} AI Business Agent`,
          systemPrompt: env.DEFAULT_SYSTEM_PROMPT,
          aiModel: "groq-llama-3.3-70b",
          temperature: 0.7,
          isDefault: true
        });
      }

      const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, { expiresIn: "30d" });

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
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
      if (!user || !user.passwordHash) {
        return res.status(400).json({ success: false, error: "Invalid credentials or login with OTP" });
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
