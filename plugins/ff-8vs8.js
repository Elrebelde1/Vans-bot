import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args}) => {
  if (!args[0]) throw `
╭━━━〔 ⚔️ *KING'S VERSUS* ⚔️ 〕━━━┓
┃
┃ ⏳ *HORARIO:*
┃ 🇲🇽 MÉXICO: 
┃ 🇨🇴 COLOMBIA: 
┃
┃ 🎮 *MODALIDAD:*
┃ 👥 *JUGADORES:* 8 VS 8
┃
┃ 🏆 *ESCUADRA A:*
┃    👑 • 
┃    ⚡ • 
┃    ⚡ • 
┃    ⚡ • 
┃
┃ 🏆 *ESCUADRA B:*
┃    👑 • 
┃    ⚡ • 
┃    ⚡ • 
┃    ⚡ • 
┃
┃ 🔄 *RESERVAS:*
┃    👤 • 
┃    👤 • 
┃
┃ 💬 *Usa:* .8vs8 [hora]
┗━━━━━━━━━━━━━━━━━━━━━━━┛
`

  const textos = [
    "👑 𝙏𝙝𝙚 𝙆𝙞𝙣𝙜'𝙨 𝘽𝙤𝙩: 𝘿𝙤𝙢𝙞𝙣𝙞𝙤 𝙏𝙤𝙩𝙖𝙡",
    "⚔️ 𝘿𝙪𝙚𝙡𝙤 𝙙𝙚 𝙍𝙚𝙮𝙚𝙨 𝘼𝙘𝙩𝙞𝙫𝙖𝙙𝙤",
    "👾 𝙎𝙮𝙨𝙩𝙚𝙢 𝙆𝙞𝙣𝙜: 𝘾𝙤𝙣𝙛lict𝙤 8𝙫𝙨8"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const titulo = textos[Math.floor(Math.random() * textos.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]
  const thumbBuffer = Buffer.from(
    (await axios.get(imagen, { responseType: 'arraybuffer'})).data
  )

  const kingMessage = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: 2024,
        message: titulo,
        footerText: "𝙏𝙝𝙚 𝙆𝙞𝙣𝙜'𝙨 𝘽𝙤𝙩 👾",
        thumbnail: thumbBuffer,
        surface: 2,
        sellerJid: "0@s.whatsapp.net"
      }
    }
  }

  const caption = `
┏━━━━〔 👑 *KING'S 8 VS 8* 👑 〕━━━┓
┃
┃ ⏳ *HORARIOS:*
┃ 🇲🇽 MÉXICO: ${args[0]}
┃ 🇨🇴 COLOMBIA: ${args[0]}
┃
┃ 🎮 *MODALIDAD:*
┃ 👥 *JUGADORES:* 8 VS 8
┃
┃ 🔱 *ESCUADRA 1:*
┃    👑 • 
┃    ⚔️ • 
┃    ⚔️ • 
┃    ⚔️ • 
┃
┃ 🔱 *ESCUADRA 2:*
┃    👑 • 
┃    ⚔️ • 
┃    ⚔️ • 
┃    ⚔️ • 
┃
┃ 🚀 *SUPLENTES:*
┃    👾 • 
┃    👾 • 
┃
┃ > ⚡ 𝙏𝙝𝙚 𝙆𝙞𝙣𝙜'𝙨 𝘽𝙤𝙩 👾
┗━━━━━━━━━━━━━━━━━━━━━━━┛`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: caption,
    mentions: []
  }, { quoted: kingMessage })
}

handler.help = ['8vs8']
handler.tags = ['freefire']
handler.command = /^(vs8|8vs8|masc8)$/i
handler.group = true
handler.admin = false

export default handler
