{
  "name": "ARIZAK-MD",
  "description": "ʙᴇsᴛ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ᴅᴇᴠᴇʟᴏᴘᴇᴅ ʙʏ ᴀ.ʀɪᴢᴀᴋ 🇰🇪",
  "keywords": ["bot", "node", "baileys", "whatsapp"],
  "logo": "https://files.catbox.moe/uol78i.jpg",
  "repository": "https://github.com/a-rizak/ARIZAK-MD",
  "succes_url": "/",
  "stack": "heroku-24",
  "env": {
    "PREFIX": {
      "description": "choose your prefix of bot",
      "value": ".",
      "required": true
    },
    "AUTO_READ_STATUS": {
      "description": "Your contact status will be read automatically (yes/no)",
      "value": "yes",
      "required": false
    },
    "AUTO_DOWNLOAD_STATUS": {
      "description": "Automatically download & send statuses (yes/no)",
      "value": "no",
      "required": false
    },
    "AUTO_READ": {
      "description": "Auto read messages (yes/no)",
      "value": "no",
      "required": false
    },
    "AUTO_REACT": {
      "description": "Auto react to messages (yes/no)",
      "value": "no",
      "required": false
    },
    "ANTICALL": {
      "description": "Reject calls automatically (yes/no)",
      "value": "no",
      "required": false
    },
    "AUTO_REACT_STATUS": {
      "description": "Auto like statuses (yes/no)",
      "value": "yes",
      "required": true
    },
    "PM_PERMIT": {
      "description": "Restrict bot usage in PM (yes/no)",
      "value": "no",
      "required": false
    },
    "BOT_NAME": {
      "description": "Bot name",
      "value": "ARIZAK-MD",
      "required": false
    },
    "BOT_MENU_LINKS": {
      "description": "Links for your bot menu (url1,url2,...)",
      "value": "https://files.catbox.moe/uol78i.jpg",
      "required": false
    },
    "PUBLIC_MODE": {
      "description": "Public mode (yes/no)",
      "value": "yes",
      "required": false
    },
    "HEROKU_API_KEY": {
      "description": "⚠️ Set this in Heroku Config Vars, not here!",
      "required": false
    },
    "HEROKU_APP_NAME": {
      "description": "Insert your Heroku app name",
      "required": false
    },
    "SESSION_ID": {
      "description": "Session ID after scanning QR code",
      "value": "",
      "required": true
    },
    "OWNER_NAME": {
      "desc": "Owner name",
      "required": false,
      "value": "A.RIZAK"
    },
    "NUMERO_OWNER": {
      "desc": "Your WhatsApp number (e.g., 2547XXXXXXXX)",
      "required": true,
      "value": "2547XXXXXXXX"
    },
    "WARN_COUNT": {
      "desc": "Warning limit",
      "required": false,
      "value": "3"
    },
    "STARTING_BOT_MESSAGE": {
      "description": "Show start-up message (yes/no)",
      "required": true,
      "value": "yes"
    },
    "PRESENCE": {
      "description": "1 online, 2 typing, 3 recording",
      "value": "2",
      "required": false
    },
    "ANTI_DELETE_MESSAGE": {
      "description": "Enable anti-delete (yes/no)",
      "value": "no",
      "required": true
    },
    "CHAT_BOT": {
      "description": "Enable chatbot replies (yes/no)",
      "value": "no",
      "required": false
    },
    "AUDIO_CHAT_BOT": {
      "description": "Enable audio chatbot (yes/no)",
      "value": "no",
      "required": false
    },
    "AUTO_BIO": {
      "description": "Enable auto bio update (yes/no)",
      "value": "yes",
      "required": false
    },
    "AUDIO_REPLY": {
      "description": "Enable audio replies (yes/no)",
      "value": "no",
      "required": false
    }
  },
  "buildpacks": [
    { "url": "heroku/nodejs" },
    { "url": "https://github.com/clhuang/heroku-buildpack-webp-binaries.git" },
    { "url": "https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest" }
  ]
    }
