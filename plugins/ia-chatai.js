import fetch from 'node-fetch'
import { downloadContentFromMessage } from '@whiskeysockets/baileys'

let handler = async (m, { text, usedPrefix, command, conn }) => {
  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || ''
  let hasImage = /^image\/(jpe?g|png)$/.test(mime)

  if (!text && !hasImage) {
    // MODIFICACIÓN 1: Mensaje de uso
    return conn.reply(m.chat, `${emoji} **¡Hola! Soy tu asistente de IA.** Manda un prompt para generar una imagen o responde a una imagen con tu pregunta. ✍️\n\n**Ejemplos:**\n${usedPrefix + command} ¿Qué detalles interesantes ves aquí?\n${usedPrefix + command} Crea una imagen de un perro astronauta en Marte`, m, rcanal)
  }

  try {
    await m.react('✨')
    conn.sendPresenceUpdate('composing', m.chat)

    let base64Image = null
    let mimeType = null

    if (hasImage) {
      const stream = await downloadContentFromMessage(q, 'image')
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }

      base64Image = `data:${mime};base64,${buffer.toString('base64')}`
      mimeType = mime
    }

    const body = {
      prompts: text ? [text] : [],
      imageBase64List: base64Image ? [base64Image] : [],
      mimeTypes: mimeType ? [mimeType] : [],
      temperature: 0.7
    }

    const res = await fetch('https://g-mini-ia.vercel.app/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const data = await res.json()


    if (data?.image && data?.from === 'image-generator') {
      // MODIFICACIÓN 2: Leyenda de la imagen generada
      return await conn.sendFile(m.chat, data.image, 'imagen.jpg', ` ¡Aquí está la imagen que me pediste! ✨\n\n\n> **Generada por IA** (Mi-Bot) 🤖`, m, rcanal)
    }
await m.react('🪄')


    const respuesta = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!respuesta) throw '❌ No se recibió respuesta válida de la IA.' // Mantenemos el error interno, pero puedes cambiarlo si quieres

    conn.reply(m.chat, respuesta.trim(), m, rcanal)
    await m.react('🌟')

  } catch (e) {
    console.error('[ERROR GEMINI]', e)
    await m.react('⚠️')
    // MODIFICACIÓN 3: Mensaje de error al usuario
    await conn.reply(m.chat, '🛑 **¡Ups!** Algo salió mal al intentar procesar tu solicitud. Intenta de nuevo más tarde.', m, rcanal)
  }
}

handler.command = ['gemini', 'geminis'];
handler.tags = ['ia'];
handler.help = ['gemini'];
handler.group = false

export default handler
