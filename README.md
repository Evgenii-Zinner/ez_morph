# 🎭 EZ-Morph // The Multi-Reality Landing Page

**EZ-Morph** is a high-performance, purely static landing page architecture built for the modern web. It features a "Morphing" system that allows for instant visual pivots between distinct aesthetic "realities" using a centralized CSS variable engine.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Workers](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Workers-orange?logo=cloudflare)](https://workers.cloudflare.com/)

---

## ✨ Key Features

- **Architectural Purity**: Built with semantic HTML5 and vanilla CSS3. Zero frameworks, zero dependencies.
- **Bento Grid System**: A responsive, modular layout that adapts to any screen or content type.
- **Morph Engine**: 
  - `CBR`: Cyberpunk (Neon & High-Contrast)
  - `PNY`: Fairy Pony (Soft & Magical)
  - `GLM`: Glamour (Sleek & Editorial)
  - `PNK`: Acid Punk (Aggressive & Glitchy)
  - `NTR`: Nature (Organic & Grounded)
- **Direct Telegram Integration**: A hyper-clean contact form system that relays messages directly to your Telegram bot via a private Cloudflare Worker.
- **Developer First**: Clean, commented code designed for easy modification and AI-assisted expansion.

---

## 🛰️ Telegram Contact Integration

EZ-Morph includes a sophisticated yet simple backend logic to handle contact form submissions without third-party services like Formspree.

### 🛠️ Configuration & Secrets

1. **Deploy the Worker**:
   ```bash
   npx wrangler deploy
   ```
2. **Find Your Chat ID**:
   We've built a diagnostic tool into the worker. Simply send `/start` to your Telegram bot, and it will reply with your unique Chat ID.
3. **Set the Webhook**:
   To enable the `/start` diagnostic tool and receive messages, you must register your worker URL with Telegram (append `/telegram-webhook` to your URL):
   ```text
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_WORKER_URL>/telegram-webhook
   ```
   *(Replace `<YOUR_BOT_TOKEN>` with your token and `<YOUR_WORKER_URL>` with your `.workers.dev` URL)*
4. **Set Secrets**:
   ```bash
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   ```

---

## 📁 Project Structure

```bash
├── index.html          # Core structure and Morph-switching logic
├── base.css            # Central architecture & design system tokens
├── theme-*.css         # Reality-specific visual overrides
├── logo.svg            # Site favicon & branding
├── worker.js           # Cloudflare Worker (Contact Form & Diagnostics)
├── wrangler.toml       # Worker configuration
└── .gitignore          # Repository hygiene
```

---

## 🤝 Contributing

Contributions are welcome! If you've created a new "Reality" (CSS Theme), feel free to open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Designed by [**Evgenii Zinner**](https://github.com/Evgenii-Zinner) // 2025
