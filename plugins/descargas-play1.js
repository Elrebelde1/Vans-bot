import yts from "yt-search";
import fetch from "node-fetch";

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text || !text.trim()) {
    return m.reply(`🦅 *¿Qᴜᴇ ʙᴜsᴄᴀs ᴇɴ ʟᴀ ᴏsᴄᴜʀɪᴅᴀᴅ?*\n\nUsᴏ ᴄᴏʀʀᴇᴄᴛᴏ:\n${usedPrefix + command} <ɴᴏᴍʙʀᴇ ᴏ URL>\n\nEx: ${usedPrefix + command} Ace of Base Happy Nation`);
  }

  await m.react("👁️"); // Reacción de inicio

  try {
    // Buscar el video en YouTube
    const search = await yts(text);
    const video = search.videos[0];

    if (!video) {
      return m.reply("🌑 *Mis ojos no ven nada con ese nombre. Intenta de nuevo.*");
    }

    const urlToUse = video.url;
    const { title, author, timestamp, views, thumbnail } = video;

    const caption = `
╭─〔 ♆ *Uᴄʜɪʜᴀ Pʟᴀʏᴇʀ* ♆ 〕─╮
│
│ 🗡️ *Tɪᴛᴜʟᴏ:* ${title}
│ 👤 *Aᴜᴛᴏʀ:* ${author.name}
│ ⏳ *Dᴜʀᴀᴄɪᴏɴ:* ${timestamp}
│ 👁️ *Vɪsᴛᴀs:* ${views.toLocaleString()}
│ 🔗 *Lɪɴᴋ:* ${urlToUse}
│
╰─────────────────────╯

🌑 *Eʟ ᴘᴏᴅᴇʀ sᴇ ᴇsᴛᴀ ᴄᴀɴᴀʟɪᴢᴀɴᴅᴏ...*`.trim();

    // Enviar miniatura e info
    await conn.sendFile(m.chat, thumbnail, "thumb.jpg", caption, m);

    // Determinar si es audio o video
    const isVideo = command === "play2" || command === "playvid";
    const type = isVideo ? "video" : "audio";
    const quality = isVideo ? "360" : "128"; // Calidades estándar para evitar errores de peso

    // Llamada a la API
    const apiRes = await fetch(`https://api.vreden.my.id/api/v1/download/youtube/${type}?url=${encodeURIComponent(urlToUse)}&quality=${quality}`);
    const json = await apiRes.json();

    // VALIDACIÓN CRÍTICA: La API puede responder 200 pero traer error en el 'result'
    if (!json.status || !json.result || !json.result.download || !json.result.download.url) {
      const errorMsg = json.result?.download?.message || "Error desconocido en el servidor";
      return m.reply(`💢 *Fᴀʟʟᴏ ᴇʟ Jᴜᴛsᴜ:* ${errorMsg}`);
    }

    const dlUrl = json.result.download.url;

    if (isVideo) {
      // Enviar Video
      await conn.sendMessage(m.chat, {
        video: { url: dlUrl },
        mimetype: "video/mp4",
        fileName: `${title}.mp4`,
        caption: `⚡ *Aϙᴜɪ ᴛɪᴇɴᴇs ᴛᴜ ᴅᴇsᴛɪɴᴏ.*`
      }, { quoted: m });
      await m.react("🦅");
    } else {
      // Enviar Audio
      await conn.sendMessage(m.chat, {
        audio: { url: dlUrl },
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`
      }, { quoted: m });
      await m.react("🎧");
    }

  } catch (error) {
    console.error(error);
    m.reply("⚠️ *💢 Mɪs ᴏᴊᴏs ʜᴀɴ sɪᴅᴏ ʙʟᴏϙᴜᴇᴀᴅᴏs. Oᴄᴜʀʀɪᴏ ᴜɴ ᴇʀʀᴏʀ ᴇɴ ᴇʟ Jᴜᴛsᴜ.*");
  }
};

handler.help = ["play", "play2", "playvid"];
handler.tags = ["descargas"];
handler.command = /^(play|play2|playvid)$/i;

export default handler;
