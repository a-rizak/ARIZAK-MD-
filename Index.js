const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info")

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // will print QR in terminal
    })

    // connection status
    sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
        if (qr) qrcode.generate(qr, { small: true }) // show QR
        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
            console.log("Connection closed. Reconnecting:", shouldReconnect)
            if (shouldReconnect) startBot()
        } else if (connection === "open") {
            console.log("✅ ARIZAK-MD WhatsApp Bot Connected!")
        }
    })

    // save session
    sock.ev.on("creds.update", saveCreds)

    // listen for messages
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0]
        if (!msg.message || msg.key.fromMe) return

        const from = msg.key.remoteJid
        const type = Object.keys(msg.message)[0]
        const text = type === "conversation" ? msg.message.conversation : (msg.message.extendedTextMessage?.text || "")

        console.log("📩 Message from", from, ":", text)

        // Commands
        if (text.toLowerCase() === "hi") {
            await sock.sendMessage(from, { text: "👋 Hello! I am ARIZAK-MD Bot." })
        }

        if (text.toLowerCase() === "menu") {
            await sock.sendMessage(from, {
                text: `📌 *ARIZAK-MD BOT MENU*
1. hi → Say hello
2. menu → Show this menu
3. owner → Get bot owner info
                `
            })
        }

        if (text.toLowerCase() === "owner") {
            await sock.sendMessage(from, { text: "🤖 Bot by *A.RIZAK*" })
        }
    })
}

startBot()
