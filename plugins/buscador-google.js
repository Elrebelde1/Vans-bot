
import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, args}) => {
  if (!text) {
    return m.reply(`🔍 Por favor, dime qué quieres buscar en *Google*.\n\n📌 Ejemplo: ${usedPrefix}google Momo Twice`)
}

  const query = encodeURIComponent(text.trim())
  const apiUrl = `https://delirius-apiofc.vercel.app/search/googlesearch?query=${query}`
  const maxResults = Math.min(Number(args[1]) || 3, 10)

  try {
    await m.react('🕒')
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!Array.isArray(json.data) || json.data.length === 0) {
      await m.react('❌')
      return m.reply('😕 No encontré resultados para esa búsqueda.')
}

    let reply = `🔎 *Resultados de búsqueda para:* _${text}_\n\n`
    json.data.slice(0, maxResults).forEach((item, i) => {
      reply += `✨ *${i + 1}. ${item.title || 'Sin título'}*\n`
      reply += `📝 ${item.description || '_Sin descripción_'}\n`
      reply += `🔗 ${item.url || '_Sin URL_'}\n\n`
})

    await m.reply(reply.trim())
    await m.react('✅')
} catch (err) {
    await m.react('⚠️')
    m.reply(`🚨 Ocurrió un error al buscar en Google.\n> Usa *${usedPrefix}report* para informarlo.\n\n🧾 ${err.message}`)
}
}

handler.help = ['google']
handler.command = ['google']
handler.tags = ['internet']
handler.group = false

export default handler