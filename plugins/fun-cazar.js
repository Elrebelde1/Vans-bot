import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    // Reacción de reloj mientras carga
    await conn.sendMessage(m.chat, { react: { text: "🚘", key: m.key }})

    let img = 'https://files.catbox.moe/dcp02s.jpg'
    let contacto = '+506 7146 3198'
    let nombre = 'Eliud'
    
    let caption = `
👋 *Hola, soy Vans bot* 🚘

👤 *Creador:* ${nombre}
📱 *Contacto:* ${contacto}
✨ *Estado:* Disponible para consultas.

> Si necesitas ayuda o reportar un error, contacta directamente a mi desarrollador.`

    // Enviamos la imagen con el contacto
    await conn.sendFile(m.chat, img, 'owner.jpg', caption, m)

    // Opcional: Envía la tarjeta de contacto (VCard)
    await conn.sendContact(m.chat, [{ displayName: nombre, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;${nombre};;;\nFN:${nombre}\nTEL;type=CELL;type=VOICE;waid=${contacto.replace(/[^0-9]/g, '')}:${contacto}\nEND:VCARD` }], m)

  } catch (e) {
    console.log(e)
    m.reply(`❌ Error al mostrar el contacto: ${e.message || e}`)
  }
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creador', 'contacto']

export default handler
