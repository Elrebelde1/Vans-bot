import axios from 'axios'

let handler = async (m, { conn, args}) => {
  if (!args[0]) throw `
╭╾━━━━╼ 〔 📋 〕 ╾━━━━╼╮
│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝖱𝖾𝗍𝗈 𝟤𝟢𝗏𝗌𝟤𝟢*
│
│ ⏳ *ʜᴏʀᴀʀɪᴏ:*
│ 🇲🇽 MÉXICO:
│ 🇨🇴 COLOMBIA:
│
│ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*
│ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:*
│
│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 1:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 2:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 3:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 4:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 5:*
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

  // Mensaje citado tipo Izumi con imagen y título aleatorio
  const titulos = [
    "👟 VANS BOT | ELITE 20x20",
    "🛸 ELIUD SYSTEM | GUERRA DE CLANES",
    "🔥 VANS OFF THE WALL | MAX BATTLE"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const titulo = titulos[Math.floor(Math.random() * titulos.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]

  let thumbBuffer
  try {
    const res = await axios.get(imagen, { responseType: 'arraybuffer'})
    thumbBuffer = Buffer.from(res.data)
  } catch (e) {
    console.log("Error cargando imagen:", e)
    thumbBuffer = Buffer.alloc(0)
  }

  const izumi = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: 20,
        message: titulo,
        footerText: "𝖵𝖺𝗇𝗌 𝖡𝗈𝗍 • 𝖡𝗒 𝖤𝗅𝗂𝗎𝖽",
        thumbnail: thumbBuffer,
        surface: 2,
        sellerJid: "0@s.whatsapp.net"
      }
    }
  }

  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: `╭╾━━━━╼ 〔 👟 〕 ╾━━━━╼╮\n│  💢 *𝟤𝟢 𝖵𝖲 𝟤𝟢 | 𝖁𝖆𝖓𝖘 𝕭𝖔𝖙*\n│\n│ ⏳ *ʜᴏʀᴀʀɪᴏ:*\n│ 🇲🇽 MÉXICO: ${args[0]}\n│ 🇨🇴 COLOMBIA: ${args[0]}\n│\n│ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*\n│ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:*\n│\n│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 2:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 3:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 4:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🥷 *ᴇsᴄᴜᴀᴅʀᴀ 5:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🔄 *sᴜᴘʟᴇɴᴛᴇs:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯\n*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`,
    mentions: []
  }, { quoted: izumi})
}

handler.help = ['20vs20']
handler.tags = ['freefire']
handler.command = /^(vs20|20vs20)$/i
handler.group = true

export default handler;
