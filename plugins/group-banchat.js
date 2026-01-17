let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = true
    
    let mensaje = `╭╾━━━━╼ 〔 🚫 〕 ╾━━━━╼╮\n`
    mensaje += `│  👟 *𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 𝖣𝖾𝗌𝖺𝖼𝗍𝗂𝗏𝖺𝖽𝗈*\n`
    mensaje += `│\n`
    mensaje += `│ 𝖤𝗌𝗍𝖾 𝖼𝗁𝖺𝗍 𝗁𝖺 𝗌𝗂𝖽𝗈 𝖻𝖺𝗇𝖾𝖺𝖽𝗈.\n`
    mensaje += `│ 𝖤𝗅 𝖻𝗈𝗍 𝗇𝗈 𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝖾𝗋𝖺́ 𝗆𝖺́𝗌 𝖺𝗊𝗎𝗂́.\n`
    mensaje += `╰╾━━━━╼ 〔 🛸 〕 ╾━━━━╼╯\n`
    mensaje += `*𝖡𝗒 𝖤𝗅𝗂𝗎𝖽 • 𝖵𝖺𝗇𝗌 𝖡𝗈𝗍*`

    await conn.reply(m.chat, mensaje, m)
    await m.react('👟')
}

handler.help = ['banearbot']
handler.tags = ['group']
handler.command = ['banearbot', 'banchat']
handler.group = true 

export default handler
