/**
 * CLOUDFLARE WORKER: TELEGRAM TRANSMISSION ENGINE
 * 
 * This worker handles form submissions for the Multistyle Landing Page.
 * Since it uses Cloudflare's Assets feature, it only runs for the 'POST' request.
 * Everything else is served as static files automatically.
 */

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Define common headers for CORS support
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        // Handle CORS preflight requests
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: corsHeaders,
            });
        }

        // --- 1. HANDLE POST (Contact Form or Telegram Webhook) ---
        if (request.method === "POST") {
            try {
                const data = await request.json();

                // 🤖 TELEGRAM WEBHOOK DIAGNOSTICS
                // We check if the incoming body looks like a Telegram Update
                if (data.message && data.message.chat) {
                    const chatId = data.message.chat.id;
                    const text = data.message.text || "";

                    // Match "/start" or "/start@bot_name"
                    if (text.startsWith("/start")) {
                        const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

                        try {
                            await fetch(telegramUrl, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    chat_id: chatId,
                                    text: `🎭 *EZ-Morph Diagnostic Uplink*\n\nYour Transmission ID (Chat ID) is:\n\`${chatId}\`\n\nSet this in your environment as \`TELEGRAM_CHAT_ID\`.`,
                                    parse_mode: "Markdown",
                                }),
                            });
                        } catch (e) {
                            console.error("Failed to send diagnostic response:", e);
                        }

                        return new Response("OK", { status: 200 });
                    }
                }

                // 📝 CONTACT FORM SUBMISSION
                if (url.pathname === "/submit-form") {
                    const { name, email, message } = data;

                    if (!name || !email || !message) {
                        return new Response(JSON.stringify({ error: "Transmission Incomplete" }), {
                            status: 400,
                            headers: { "Content-Type": "application/json", ...corsHeaders }
                        });
                    }

                    const telegramMessage = `🚀 *NEW TRANSMISSION*\n━━━━━━━━━━━━━━\n👤 *ID:* ${name}\n📧 *ENC:* ${email}\n\n📝 *DATA:*\n${message}\n━━━━━━━━━━━━━━`;
                    const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

                    const response = await fetch(telegramUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chat_id: env.TELEGRAM_CHAT_ID,
                            text: telegramMessage,
                            parse_mode: "Markdown",
                        }),
                    });

                    if (!response.ok) throw new Error("Telegram API Uplink Failed");

                    return new Response(JSON.stringify({ success: true }), {
                        headers: { "Content-Type": "application/json", ...corsHeaders }
                    });
                }
            } catch (err) {
                // Return generic 200 for non-JSON or missing properties to stop Telegram retries
                // But return 400 for form submissions
                if (url.pathname === "/submit-form") {
                    return new Response(JSON.stringify({ error: "Invalid Request Format" }), {
                        status: 400,
                        headers: { "Content-Type": "application/json", ...corsHeaders }
                    });
                }
                return new Response("OK", { status: 200 });
            }
        }

        // --- 2. FALLBACK (Serve assets via Cloudflare) ---
        return env.ASSETS.fetch(request);
    },
};
