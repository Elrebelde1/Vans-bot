Let handler = async (m, { conn, isAdmin, isROwner} ) => {
    // Solo un administrador o el dueño del bot pueden 'encender las luces'
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)
    
    // Quita la prohibición del chat: ¡El bot vuelve del Polo Norte!
    global.db.data.chats[m.chat].isBanned = false
    
    // Mensaje festivo de confirmación
    await conn.reply(m.chat, '🌟 ¡Luces de Navidad Encendidas! El Bot está *activo* de nuevo en este grupo. ¡Felices Fiestas!', m, rcanal)
    
    // Reacción festiva
    await m.react('🎄')
}
handler.help = ['desbanearbot']
handler.tags = ['group']
handler.command = ['desbanearbot', 'unbanchat']
handler.group = true 
export default handler
