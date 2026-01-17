import axios from 'axios'

let handler = async (m, { conn, args}) => {
  if (!args[0]) throw `
╭╾━━━━╼ 〔 📋 〕 ╾━━━━╼╮
│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝖱𝖾𝗍𝗈 𝟣𝟨𝗏𝗌𝟣𝟨*
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
│
│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 2:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 3:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 4:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│ 🔄 *sᴜᴘʟᴇɴᴛᴇs:*
│   🥷🏻 •
│   🥷🏻 •
╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯
*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*
`

  const encabezados = [
    "👟 VANS BOT | BATTLE 16x16",
    "🛸 ELIUD SYSTEM | RETO ACTIVADO",
    "🔥 VANS OFF THE WALL - VS"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const titulo = encabezados[Math.floor(Math.random() * encabezados.length)]
  const img = imagenes[Math.floor(Math.random() * imagenes.length)]

  const thumbnail = Buffer.from(
    (await axios.get(img, { responseType: 'arraybuffer'})).data
  )

  const izumi = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: 16,
        message: titulo,
        footerText: "𝖵𝖺𝗇𝗌 𝖡𝗈𝗍 • 𝖡𝗒 𝖤𝗅𝗂𝗎𝖽",
        thumbnail: thumbnail,
        surface: 2,
        sellerJid: "0@s.whatsapp.net"
      }
    }
  }

  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: `╭╾━━━━╼ 〔 👟 〕 ╾━━━━╼╮\n│  🔥 *𝟣𝟨 𝖵𝖲 𝟣𝟨 | 𝖁𝖆𝖓𝖘 𝕭𝖔𝖙*\n│\n│ ⏳ *ʜᴏʀᴀʀɪᴏ:*\n│ 🇲🇽 MÉXICO: ${args[0]}\n│ 🇨🇴 COLOMBIA: ${args[0]}\n│\n│ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*\n│ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:*\n│\n│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 2:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 3:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 4:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🔄 *sᴜᴘʟᴇɴᴛᴇs:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯\n*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`,
    mentions: []
  }, { quoted: izumi })
}

handler.help = ['16vs16']
handler.tags = ['freefire']
handler.command = /^(vs16|16vs16)$/i
handler.group = true
handler.admin = false

export default handler
