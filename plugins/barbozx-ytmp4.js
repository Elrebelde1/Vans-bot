
import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command}) => {
  const apikey = "sylphy-8238wss";

  if (!text ||!text.includes("youtube.com") &&!text.includes("youtu.be")) {
    return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <enlace de YouTube>\n📍 *Ejemplo:* ${usedPrefix + command} https://youtu.be/g5nG15iTPT8`);
}

  try {
    const url = `https://api.sylphy.xyz/download/ytmp4?url=${encodeURIComponent(text)}&apikey=${apikey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

    const json = await res.json();
    if (!json.status ||!json.res ||!json.res.url) {
      return m.reply("❌ No se pudo obtener el video. Verifica el enlace o intenta con otro.");
}

    const { title, url: videoUrl} = json.res;

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videoUrl},
        caption: `🎬 *${title}*\n\n✅ Video descargado con éxito.`,
        fileName: `${title}.mp4`
},
      { quoted: m}
);
} catch (error) {
    console.error("❌ Error:", error);
    await conn.reply(m.chat, `🚨 *Error:* ${error.message || "No se pudo procesar la solicitud."}`, m);
}
};

handler.help = ["ytmp4 <enlace>"];
handler.tags = ["descargas"];
handler.command = ["ytmp4"];

export default handler;