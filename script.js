// ============================================================
// TELEGRAM-ONLY ENFORCEMENT - Reliable detection
// ============================================================
(function() {
    // Method 1: Check if Telegram Web App is available
    let isTelegram = false;
    try {
        // The SDK creates window.Telegram.WebApp
        if (window.Telegram && window.Telegram.WebApp) {
            isTelegram = true;
        }
    } catch (e) {
        isTelegram = false;
    }

    // Method 2: Also check user-agent for Telegram (fallback)
    if (!isTelegram) {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        if (ua.includes('Telegram') || ua.includes('TelegramDesktop') || ua.includes('TelegramAndroid') || ua.includes('TelegramIOS')) {
            isTelegram = true;
        }
    }

    // If not inside Telegram, show blocking message
    if (!isTelegram) {
        document.documentElement.innerHTML = `
            <head><style>
                * { margin:0; padding:0; box-sizing:border-box; }
                body { display:flex; align-items:center; justify-content:center; min-height:100vh; background:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding:20px; }
                .blocked { text-align:center; max-width:420px; padding:40px 20px; }
                .blocked .icon { font-size:64px; color:#ef4444; margin-bottom:20px; }
                .blocked h1 { font-size:28px; color:#1e293b; margin-bottom:12px; }
                .blocked p { color:#64748b; font-size:16px; line-height:1.6; margin-bottom:16px; }
                .blocked .note { background:#e2e8f0; padding:12px 20px; border-radius:8px; font-size:14px; color:#475569; display:inline-block; }
                .blocked .note i { margin-right:8px; }
            </style></head>
            <body>
                <div class="blocked">
                    <div class="icon">⚠️</div>
                    <h1>Telegram Web App Only</h1>
                    <p>This mini app is designed to work exclusively inside the Telegram app.</p>
                    <p style="font-size:14px;color:#94a3b8;">Please open it from a Telegram bot to use this tool.</p>
                    <div class="note"><i>📱</i> Open Telegram and search for the bot</div>
                </div>
            </body>
        `;
        throw new Error('Blocked: Not inside Telegram Web App');
    }

    // ============================================================
    // If we reach here, we are inside Telegram - continue with the app
    // ============================================================
    console.log('✅ Telegram Web App detected. Loading the builder...');
})();

// ============================================================
// MAIN APP CODE (only executes if inside Telegram)
// ============================================================
const BOT_USERNAME = 'YourBotUsername'; // Replace with your bot username

// ... (rest of your full script.js code, all the functions and event listeners)
