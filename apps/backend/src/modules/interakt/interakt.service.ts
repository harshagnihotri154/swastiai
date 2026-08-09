export class InteraktService {
  /**
   * Send text message via Interakt API
   * Interakt API: POST https://api.interakt.ai/v1/public/message/
   */
  static async sendTextMessage(
    interaktApiKey: string,
    countryCode: string,
    phoneNumber: string,
    messageText: string
  ): Promise<any> {
    const url = "https://api.interakt.ai/v1/public/message/";

    const payload = {
      countryCode: countryCode.startsWith("+") ? countryCode : `+${countryCode}`,
      phoneNumber: phoneNumber.replace(/^\+/, ""),
      type: "Text",
      data: {
        message: messageText
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${interaktApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || "Failed to send message via Interakt API");
    }

    return data;
  }
}
