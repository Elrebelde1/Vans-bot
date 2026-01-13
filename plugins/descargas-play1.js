import yts from "yt-search";
import fetch from "node-fetch";

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text || !text.trim()) {
    return m.reply(`🦅 *¿Qᴜᴇ ʙᴜsᴄᴀs ᴇɴ ʟᴀ ᴏsᴄᴜʀɪᴅᴀᴅ?*\n\nUsᴏ ᴄᴏʀʀᴇᴄᴛᴏ:\n${usedPrefix + command} <ɴᴏᴍʙʀᴇ ᴏ URL>\n\nEx: ${usedPrefix + command} Ace of Base Happy Nation`);
  }

  await m.react("👁️");

  try {
    // 1. Búsqueda de metadatos
    const search = await yts(text);
    const video = search.videos[0];

    if (!video) {
      await m.react("❌");
      return m.reply("🌑 *Mis ojos no ven nada con ese nombre.*");
    }

    const { title, author, timestamp, views, thumbnail, url: urlToUse } = video;
    const isVideo = /play2|playvid/i.test(command);

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

    await conn.sendFile(m.chat, thumbnail, "thumb.jpg", caption, m);

    let dlUrl = null;

    // 2. Intento con API Vreden (Ruta Directa de Play)
    try {
      const type = isVideo ? "video" : "audio";
      // Usamos el endpoint /play/ que es más directo si la URL falla
      const apiVreden = await fetch(`https://api.vreden.my.id/api/v1/download/play/${type}?query=${encodeURIComponent(text)}`);
      const resVreden = await apiVreden.json();
      
      if (resVreden.status && resVreden.result?.download?.url) {
        dlUrl = resVreden.result.download.url;
      }
    } catch (e) {
      console.log("Error en Vreden Principal");
    }

    // 3. Backup: API Agatz (Si la anterior falla)
    if (!dlUrl) {
      try {
        const apiBackup = await fetch(`https://api.agatz.xyz/api/yt${isVideo ? "mp4" : "mp3"}?url=${encodeURIComponent(urlToUse)}`);
        const resBackup = await apiBackup.json();
        dlUrl = resBackup.data?.url || resBackup.result;
      } catch (e) {
        console.log("Error en Backup Agatz");
      }
    }

    if (!dlUrl || typeof dlUrl !== 'string') throw new Error("Todas las fuentes de energía han fallado.");

    // 4. Envío del archivo
    if (isVideo) {
      await conn.sendMessage(m.chat, {
        video: { url: dlUrl },
        mimetype: "video/mp4",
        fileName: `${title}.mp4`,
        caption: `⚡ *Aquí tienes tu destino.*`
      }, { quoted: m });
      await m.react("🦅");
    } else {
      await conn.sendMessage(m.chat, {
        audio: { url: dlUrl },
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`
      }, { quoted: m });
      await m.react("🎧");
    }

  } catch (error) {
    console.error(error);
    await m.react("❌");
    m.reply(`⚠️ *💢 Mɪs ᴏᴊᴏs ʜᴀɴ sɪᴅᴏ ʙʟᴏϙᴜᴇᴀᴅᴏs.*\n\n*Detalle:* ${error.message}`);
  }
};

handler.help = ["play", "play2", "playvid"];
handler.tags = ["descargas"];
handler.command = /^(play|play2|playvid)$/i;

export default handler;
