import fg from 'api-dylux'
import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args, command, usedPrefix}) => {
  if (!args[0]) throw `
╭╾━━━━╼ 〔 📋 〕 ╾━━━━╼╮
│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝖱𝖾𝗍𝗈 𝟦𝗏𝗌𝟦*
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
│ 🧱 *sᴜᴘʟᴇɴᴛᴇs:*
│   🥷🏻 •
│   🥷🏻 •
╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯
*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*
`

  const fkontak = {
    key: {
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'VansMenu'
    },
    message: {
      locationMessage: {
        name: '🛸 INVOCACIÓN | 𝖁𝖆𝖓𝖘 𝕭𝖔𝖙',
        jpegThumbnail: await (await fetch('https://files.catbox.moe/1j784p.jpg')).buffer(),
        vcard:
          'BEGIN:VCARD\n' +
          'VERSION:3.0\n' +
          'N:;Eliud;;;\n' +
          'FN:Eliud\n' +
          'ORG:Vans Developers\n' +
          'TITLE:\n' +
          'item1.TEL;waid=19709001746:+1 (970) 900-1746\n' +
          'item1.X-ABLabel:Eliud\n' +
          'X-WA-BIZ-DESCRIPTION:Reto organizado vía 𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 👟\n' +
          'X-WA-BIZ-NAME:Eliud\n' +
          'END:VCARD'
      }
    }
  }

  await conn.sendMessage(m.chat, {
    text: '🎯 *¡Reto 4vs4 detectado por Vans Bot!*',
  }, { quoted: fkontak })

  // Mensaje visual principal
  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: `╭╾━━━━╼ 〔 👟 〕 ╾━━━━╼╮\n│  🔥 *𝟦 𝖵𝖲 𝟦 | 𝖁𝖆𝖓𝖘 𝕭𝖔𝖙*\n│\n│ ⏳ *ʜᴏʀᴀʀɪᴏ:*\n│ 🇲🇽 MÉXICO: ${args[0]}\n│ 🇨🇴 COLOMBIA: ${args[0]}\n│\n│ 🎮 *ᴍᴏᴅᴀʟɪᴅᴀᴅ:*\n│ 👥 *ᴊᴜɢᴀᴅᴏʀᴇs:*\n│\n│ 🏆 *ᴇsᴄᴜᴀᴅʀᴀ 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│ 🧱 *sᴜᴘʟᴇɴᴛᴇs:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯\n*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`,
    mentions: []
  }, { quoted: fkontak })
}

handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(vs4|4vs4|masc4)$/i
handler.group = true

export default handler
