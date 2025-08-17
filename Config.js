const fs = require("fs-extra");
const path = require("path");
const { Sequelize } = require("sequelize");

if (fs.existsSync("settings.env")) {
  require("dotenv").config({ path: __dirname + "/settings.env" });
}

const databasePath = path.join(__dirname, "./database.db");
const DATABASE_URL = process.env.DATABASE_URL || `sqlite:${databasePath}`;
const toBool = (x) => x === "yes";

module.exports = {
  session: process.env.SESSION_ID || "",
  PREFIX: process.env.PREFIX || "+",
  OWNER_NAME: process.env.OWNER_NAME || "Abdirizak",
  OWNER_NUMBER: process.env.NUMERO_OWNER || "255767862457",
  
  BOT: process.env.BOT_NAME || "ARIZAK-MD",
  URL: process.env.BOT_MENU_LINKS || "https://files.catbox.moe/8qq3l4.jpg",
  
  MODE: toBool(process.env.PUBLIC_MODE || "yes"),
  PM_PERMIT: toBool(process.env.PM_PERMIT || "yes"),
  AUTO_READ: toBool(process.env.AUTO_READ || "yes"),
  AUTO_READ_STATUS: toBool(process.env.AUTO_READ_STATUS || "yes"),
  AUTO_DOWNLOAD_STATUS: toBool(process.env.AUTO_DOWNLOAD_STATUS || "no"),
  AUTO_REACT: toBool(process.env.AUTO_REACT || "no"),
  AUTO_REACT_STATUS: toBool(process.env.AUTO_REACT_STATUS || "yes"),
  CHAT_BOT: toBool(process.env.CHAT_BOT || "yes"),
  AUDIO_REPLY: toBool(process.env.AUDIO_REPLY || "no"),
  ANTICALL: toBool(process.env.ANTICALL || "yes"),
  ANTIDELETE1: toBool(process.env.ANTI_DELETE_MESSAGE || "no"),
  AUTO_BIO: toBool(process.env.AUTO_BIO || "yes"),

  WARN_COUNT: parseInt(process.env.WARN_COUNT || "3", 10),
  STATUS: process.env.PRESENCE || "",
  DP: process.env.STARTING_BOT_MESSAGE || "yes",

  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,

  DATABASE_URL,
};

// Hot reload support
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
  fs.unwatchFile(fichier);
  console.log(`🔄 Config updated: ${__filename}`);
  delete require.cache[fichier];
  require(fichier);
});
