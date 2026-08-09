import { env } from "../../config/env";

export class WhatsAppService {
  private static graphApiUrl = "https://graph.facebook.com/v19.0";

  /**
   * Send a text message to a WhatsApp user
   */
  static async sendTextMessage(to: string, text: string): Promise<any> {
    const accessToken = env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!accessToken || !phoneNumberId) {
      throw new Error("Meta WhatsApp credentials (WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID) are missing");
    }

    // Clean phone number (remove +, spaces, dashes)
    const cleanTo = to.replace(/\D/g, "");

    const url = `${this.graphApiUrl}/${phoneNumberId}/messages`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanTo,
        type: "text",
        text: {
          preview_url: false,
          body: text,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error sending WhatsApp message via Meta API:", data);
      throw new Error(data.error?.message || "Failed to send WhatsApp message");
    }

    return data;
  }

  /**
   * Send a template message (e.g., hello_world or custom approved template)
   */
  static async sendTemplateMessage(
    to: string,
    templateName: string = "hello_world",
    languageCode: string = "en_US"
  ): Promise<any> {
    const accessToken = env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!accessToken || !phoneNumberId) {
      throw new Error("Meta WhatsApp credentials are missing");
    }

    const cleanTo = to.replace(/\D/g, "");

    const url = `${this.graphApiUrl}/${phoneNumberId}/messages`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: cleanTo,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error sending WhatsApp template:", data);
      throw new Error(data.error?.message || "Failed to send template message");
    }

    return data;
  }

  /**
   * Mark an incoming message as read
   */
  static async markAsRead(messageId: string): Promise<any> {
    const accessToken = env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!accessToken || !phoneNumberId) return;

    const url = `${this.graphApiUrl}/${phoneNumberId}/messages`;

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          status: "read",
          message_id: messageId,
        }),
      });
    } catch (err) {
      console.error("Error marking message as read:", err);
    }
  }
}
