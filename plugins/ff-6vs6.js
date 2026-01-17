import axios from 'axios'

let handler = async (m, { conn, args}) => {
  if (!args[0]) throw `
╭╾━━━━╼ 〔 📋 〕 ╾━━━━╼╮
│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝖱𝖾𝗍𝗈 𝟨𝗏𝗌𝟨*
│
│ ⏳ *ʜᴏʀᴀʀɪᴏ:*
│ 🇲🇽 MÉXICO:
│ 🇨🇴 COLOMBIA:
│
│ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*
│ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:*
│
│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 1:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│ 🔄 *sᴜᴘʟᴇɴᴛᴇs:*
│   🥷🏻 •
│   🥷🏻 •
╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯
*𝖡𝗒 𝖤𝗅𝗂𝗎搬 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*
`

  const mensajes = [
    "🔥 COMBATE PREPARADO | Vans Bot",
    "⚡ RETO 6vs6 | Eliud System",
    "💣 LLAMADO GRUPAL | Vans Off The Wall"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const textoRandom = mensajes[Math.floor(Math.random() * mensajes.length)]
  const imagenRandom = imagenes[Math.floor(Math.random() * imagenes.length)]

  let thumbBuffer
  try {
    const res = await axios.get(imagenRandom, { responseType: 'arraybuffer'})
    thumbBuffer = Buffer.from(res.data)
  } catch (err) {
    console.error("Error al cargar imagen de miniatura:", err)
    thumbBuffer = Buffer.from('')
  }

  const izumi = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: 6,
        message: textoRandom,
        footerText: "𝖵𝖺𝗇𝗌 𝖡𝗈𝗍 • 𝖡𝗒 𝖤𝗅𝗂𝗎𝖽",
        thumbnail: thumbBuffer,
        surface: 2,
        sellerJid: "0@s.whatsapp.net"
      }
    }
  }

  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: `╭╾━━━━╼ 〔 👟 〕 ╾━━━━╼╮\n│  💥 *𝟨 𝖵𝖲 𝟨 | 𝖁𝖆𝖓𝖘 𝕭𝖔𝖙*\n│\n│ ⏳ *ʜᴏʀᴀʀɪᴏ:*\n│ 🇲🇽 MÉXICO: ${args[0]}\n│ 🇨🇴 COLOMBIA: ${args[0]}\n│\n│ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*\n│ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:*\n│\n│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🔄 *sᴜᴘʟᴇɴᴛᴇs:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯\n*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`,
    mentions: []
  }, { quoted: izumi})
}

handler.help = ['6vs6']
handler.tags = ['freefire']
handler.command = /^(vs6|6vs6|masc6)$/i
handler.group = true
handler.admin = true

export default handler
