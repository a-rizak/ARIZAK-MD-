// ARIZAK-MD WhatsApp Bot - Pairing Code + Commands + Media + YouTube Downloader
// By Rizak (customized for pairing, commands, media & YT)

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const yts = require("yt-search");
const ytdl = require("ytdl-core");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`✅ Using WA version: ${version}, Latest: ${isLatest}`);

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
  });

  // 🔑 Generate Pairing Code
  if (!sock.authState.creds.registered) {
    const phoneNumber = "254712345678"; // <-- CHANGE THIS TO YOUR NUMBER
    const code = await sock.requestPairingCode(phoneNumber);
    console.log("🔑 Your Pairing Code:", code);
  }

  sock.ev.on("creds.update", saveCreds);

  // Auto-reconnect
  sock.ev.on("connection.update", (update) => {
    const { connection } = update;
    if (connection === "close") {
      console.log("❌ Disconnected. Reconnecting...");
      startBot();
    } else if (connection === "open") {
      console.log("✅ Bot connected to WhatsApp!");
    }
  });

  // 📩 Handle incoming messages
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    console.log(`📥 Message from ${from}: ${text}`);

    if (!text.startsWith(".")) return;
    const args = text.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();

    switch (command) {
      case "menu":
        await sock.sendMessage(from, {
          text: `
📜 *ARIZAK-MD MENU*
-------------------------
💬 .hi       → Greet
⚡ .ping     → Test response
👤 .owner    → Owner info
ℹ️ .about    → About bot
🖼 .image    → Send an image
🎵 .audio    → Send an audio
🤣 .sticker  → Send a sticker
🎶 .ytmp3 <song> → Download MP3
🎥 .ytmp4 <video> → Download MP4
-------------------------
`,
        }, { quoted: msg });
        break;

      case "hi":
        await sock.sendMessage(from, { text: "👋 Hello! How can I assist you?" }, { quoted: msg });
        break;

      case "ping":
        await sock.sendMessage(from, { text: "🏓 Pong! Bot is alive!" }, { quoted: msg });
        break;

      case "owner":
        await sock.sendMessage(from, { text: "👤 Owner: Rizak\n📱 WhatsApp: wa.me/254712345678" }, { quoted: msg });
        break;

      case "about":
        await sock.sendMessage(from, { text: "🤖 ARIZAK-MD Bot\n⚡ Multi-device WhatsApp Bot\n🛠 Powered by Baileys" }, { quoted: msg });
        break;

      // --- MEDIA EXAMPLES ---
      case "image":
        await sock.sendMessage(from, {
          image: fs.readFileSync("./media/sample.jpg"),
          caption: "🖼 Here’s an image!"
        }, { quoted: msg });
        break;

      case "audio":
        await sock.sendMessage(from, {
          audio: fs.readFileSync("./media/sample.mp3"),
          mimetype: "audio/mp4",
          ptt: true
        }, { quoted: msg });
        break;

      case "sticker":
        await sock.sendMessage(from, {
          sticker: fs.readFileSync("./media/sample.webp")
        }, { quoted: msg });
        break;

      // --- YOUTUBE DOWNLOADER ---
      case "ytmp3":
        if (!args[0]) {
          await sock.sendMessage(from, { text: "❌ Usage: .ytmp3 <song name>" }, { quoted: msg });
          return;
        }
        const searchSong = await yts(args.join(" "));
        const song = searchSong.videos[0];
        if (!song) {
          await sock.sendMessage(from, { text: "❌ Song not found." }, { quoted: msg });
          return;
        }
        await sock.sendMessage(from, { text: `🎶 Downloading *${song.title}*...` }, { quoted: msg });
        const mp3Path = "./media/song.mp3";
        const mp3Stream = ytdl(song.url, { filter: "audioonly" }).pipe(fs.createWriteStream(mp3Path));
        mp3Stream.on("finish", async () => {
          await sock.sendMessage(from, {
            audio: fs.readFileSync(mp3Path),
            mimetype: "audio/mp4",
            fileName: song.title + ".mp3"
          }, { quoted: msg });
        });
        break;

      case "ytmp4":
        if (!args[0]) {
          await sock.sendMessage(from, { text: "❌ Usage: .ytmp4 <video name>" }, { quoted: msg });
          return;
        }
        const searchVid = await yts(args.join(" "));
        const vid = searchVid.videos[0];
        if (!vid) {
          await sock.sendMessage(from, { text: "❌ Video not found." }, { quoted: msg });
          return;
        }
        await sock.sendMessage(from, { text: `🎥 Downloading *${vid.title}*...` }, { quoted: msg });
        const mp4Path = "./media/video.mp4";
        const mp4Stream = ytdl(vid.url, { quality: "18" }).pipe(fs.createWriteStream(mp4Path));
        mp4Stream.on("finish", async () => {
          await sock.sendMessage(from, {
            video: fs.readFileSync(mp4Path),
            caption: vid.title
          }, { quoted: msg });
        });
        break;

      default:
        await sock.sendMessage(from, { text: "❓ Unknown command. Type .menu" }, { quoted: msg });
        break;
    }
  });
}

startBot();
