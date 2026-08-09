import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import whatsappRoutes from "./modules/whatsapp/whatsapp.routes";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rate limiter for public demo & test endpoints (Max 10 requests per minute per IP)
const publicLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { success: false, error: "Demo rate limit reached! Please wait 1 minute or sign up for a free account." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1/whatsapp/ask-ai", publicLimiter);

// Privacy Policy endpoint for Meta App Verification
app.get("/privacy", (_req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head><title>Swastiai Privacy Policy</title></head>
      <body style="font-family: sans-serif; padding: 40px; line-height: 1.6;">
        <h1>Privacy Policy for Swastiai</h1>
        <p>Swastiai respects your privacy and is committed to protecting your data.</p>
        <p>We process WhatsApp messages strictly to deliver automated AI customer support assistance. No personal information is shared with third parties.</p>
        <p>Contact: support@swastiai.com</p>
      </body>
    </html>
  `);
});

// Interactive AI Testing Playground endpoint
app.get("/test-ai", (_req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Swastiai AI Agent Playground 🤖</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 40px; display: flex; justify-content: center; }
          .container { background: #1e293b; border-radius: 16px; padding: 32px; width: 100%; max-width: 650px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #334155; }
          h1 { color: #38bdf8; margin-top: 0; }
          p { color: #94a3b8; }
          label { display: block; margin-top: 16px; font-weight: 600; color: #cbd5e1; }
          input, textarea { width: 100%; padding: 12px; margin-top: 6px; border-radius: 8px; border: 1px solid #475569; background: #0f172a; color: #fff; font-size: 15px; box-sizing: border-box; }
          button { margin-top: 20px; width: 100%; padding: 14px; border: none; background: #2563eb; color: #fff; font-size: 16px; font-weight: 600; border-radius: 8px; cursor: pointer; transition: 0.2s; }
          button:hover { background: #1d4ed8; }
          .result-box { margin-top: 24px; padding: 16px; background: #090d16; border-left: 4px solid #38bdf8; border-radius: 8px; display: none; }
          .status { font-weight: 600; color: #4ade80; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🤖 Swastiai AI Agent Tester</h1>
          <p>Type any question below. Groq Llama 3.3 AI will process it and send the reply straight to your WhatsApp phone!</p>
          
          <label>Your WhatsApp Phone Number (with Country Code):</label>
          <input type="text" id="phone" placeholder="Enter your WhatsApp number (e.g. 919084553059)" value="919084553059" />

          <label>Your Question for Swastiai AI:</label>
          <textarea id="question" rows="3" placeholder="e.g. What are 3 top strategies for growing an AI SaaS?"></textarea>

          <button onclick="askAI()">🚀 Send to AI Agent & WhatsApp</button>

          <div id="result" class="result-box">
            <h3>🤖 Groq Llama 3.3 Response:</h3>
            <div id="aiReply"></div>
            <div id="status" class="status"></div>
          </div>
        </div>

        <script>
          async function askAI() {
            const phone = document.getElementById('phone').value;
            const question = document.getElementById('question').value;
            const resultBox = document.getElementById('result');
            const aiReplyBox = document.getElementById('aiReply');
            const statusBox = document.getElementById('status');

            if (!question) return alert("Please enter a question!");

            resultBox.style.display = 'block';
            aiReplyBox.innerHTML = '<em>Thinking and calling Groq Llama 3.3 AI...</em>';
            statusBox.innerHTML = '';

            try {
              const res = await fetch('/webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  object: 'whatsapp_business_account',
                  entry: [{
                    changes: [{
                      value: {
                        messages: [{
                          from: phone,
                          id: 'msg_' + Date.now(),
                          type: 'text',
                          text: { body: question }
                        }]
                      }
                    }]
                  }]
                })
              });

              aiReplyBox.innerHTML = '<span style="color: #4ade80;">✅ Event Processed by AI Engine!</span> Check your phone on WhatsApp now!';
              statusBox.innerHTML = '📤 Reply sent to WhatsApp number: ' + phone;
            } catch (err) {
              aiReplyBox.innerHTML = '<span style="color: #f87171;">Error: ' + err.message + '</span>';
            }
          }
        </script>
      </body>
    </html>
  `);
});

// Meta Webhook endpoint mounted at root level (http://domain/webhook)
app.use("/", whatsappRoutes);

// Main API v1 routes
app.use("/api/v1", routes);

export default app;