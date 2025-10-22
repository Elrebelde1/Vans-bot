
import fetch from "node-fetch";

let handler = async (m, { text, usedPrefix, command}) => {
  const apikey = "sylphy-8238wss";

  if (!text ||!text.trim()) {
    return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <nombre de la canción>\n📍 *Ejemplo:* ${usedPrefix + command} Lupita`);
}

  await m.react("🎵");

  try {
    const url = `https://api.sylphy.xyz/tools/lyrics?q=${encodeURIComponent(text.trim())}&apikey=sylphy-8238wss`;
    const res = await fetch(url);
    const json = await res.json();

    if (!json.status ||!json.lyrics) {
      return m.reply("❌ No se encontró la letra de esa canción.");
}

    const { title, artist, album, preview, lyrics} = json.info;

    const caption = `
🎶 *${title}* — *${artist}*
💿 Álbum: ${album?.title || "Desconocido"}

📝 *Letra:*
${lyrics.slice(0, 1000)}...

🔊 [Escuchar preview](${preview})
`;

    await m.reply(caption);
    await m.react("✅");
} catch (error) {
    console.error("❌ Error:", error);
    m.reply("⚠️ *Ocurrió un error al obtener la letra.*");
}
};

handler.help = ["letra <nombre>", "lyrics <nombre>"];
handler.tags = ["musica"];
handler.command = ["letra", "lyrics"];

export default handler;