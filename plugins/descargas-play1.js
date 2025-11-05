import yts from "yt-search";
import fetch from "node-fetch";

const limit = 100; // MB

const handler = async (m, { conn, text, command}) => {
  if (!text ||!text.trim()) {
    return m.reply(`*Uso correcto*
:\n.play <nombre o URL de YouTube>\n
Ejemplo:.play Rojo 27\n
Ejemplo:.play https://youtu.be/yQC7Jfxz9cY`);
}

  await m.react("🎄"); // Emoji inicial festivo

  try {
    const isUrl = text.includes("youtube.com") || text.includes("youtu.be");
    const videoUrl = isUrl? text.trim(): null;

    let video;
    if (!videoUrl) {
      const res = await yts(text.trim());
      if (!res ||!res.all || res.all.length === 0) {
        return m.reply("❌ *El trineo no encontró resultados para tu búsqueda.*"); // Mensaje de error de búsqueda festivo
}
      video = res.all[0];
}

    const urlToUse = videoUrl || video.url;
    const title = video?.title || "Descarga de YouTube";
    const author = video?.author?.name || "Desconocido";
    const duration = video?.duration?.timestamp || "No disponible";
    const views = video?.views? video.views.toLocaleString(): "N/A";
    const thumbnail = video?.thumbnail || "https://i.imgur.com/JP52fdP.jpg";

    // Encabezado y etiquetas navideñas
    const caption = `
╭─[ Trineo Musical de Sasuke ]─╮ // Título festivo
│ 🎶 Villancico: ${title} // Etiqueta festiva
│ 👤 Intérprete: ${author} // Etiqueta festiva
│ ⏱️ Tiempo en el Polo: ${duration} // Etiqueta festiva
│ 👁️ Nieve Vistas: ${views} // Etiqueta festiva
│ 🔗 Pista Musical: ${urlToUse} // Etiqueta festiva
╰──────────────────╯

🎁 *Santa está empacando tu regalo...* // Mensaje de procesamiento festivo
`;

    const thumbRes = await fetch(thumbnail);
    const thumbBuffer = await await thumbRes.buffer();
    await conn.sendFile(m.chat, thumbBuffer, "thumb.jpg", caption, m);

    // --- LÓGICA MP3 CON SYLPHY.XYZ (Comando: .play) ---
    if (command === "play") {
        
        // Realiza una solicitud POST a sylphy.xyz para MP3 (audio)
        const apiRes = await fetch("https://sylphy.xyz/ytdl/mp3", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: urlToUse, // Usa la URL del video encontrado/proporcionado
                apikey: "sylphy" // Clave de API de tu ejemplo
            })
        });
        
        const json = await apiRes.json();
        // NOTA: Se asume que el enlace de descarga está en 'json.dl_link' o 'json.url'.
        const dl = json?.dl_link || json?.url;
        const format = "mp3";

        if (!dl) return m.reply("❌ *El Elfo de Audio no encontró el villancico con sylphy.xyz. Revisa tu clave y la estructura de la respuesta de la API.*"); 

        await conn.sendMessage(m.chat, {
            audio: { url: dl},
            mimetype: "audio/mpeg",
            fileName: `${title}.${format}`
        }, { quoted: m});

        await m.react("🎧"); // Emoji de éxito de audio festivo
    }

    // --- LÓGICA MP4 CON SYLPHY.XYZ (Comandos: .play2 o .playvid) ---
    if (command === "play2" || command === "playvid") {
        
        // Realiza una solicitud POST a sylphy.xyz para MP4 (video)
        const apiRes = await fetch("https://sylphy.xyz/ytdl/mp4", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: urlToUse, // Usa la URL del video encontrado/proporcionado
                quality: "720", // Calidad de video de tu ejemplo
                apikey: "sylphy" // Clave de API de tu ejemplo
            })
        });
        
        const json = await apiRes.json();
        // NOTA: Se asume que el enlace de descarga está en 'json.dl_link' o 'json.url'.
        const dl = json?.dl_link || json?.url;

        if (!dl) return m.reply("❌ *El Trineo de Video falló al cargar la peli con sylphy.xyz. Revisa tu clave y la estructura de la respuesta de la API.*");

        const fileRes = await fetch(dl);
        const sizeMB = parseInt(fileRes.headers.get("Content-Length") || 0) / (1024 * 1024);
        const sendAsDoc = sizeMB>= limit; // Esta línea no se usa, pero la dejo por consistencia

        await conn.sendMessage(m.chat, {
            video: { url: dl},
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
            caption: ""
        }, { quoted: m});

        await m.react("🎅"); // Emoji de éxito de video festivo
    }

} catch (error) {
    console.error("❌ Error:", error);
    m.reply("⚠️ *Ocurrió un error mágico al procesar tu regalo. Intenta de nuevo.*"); // Mensaje de error final festivo
}
};

handler.help = ["play <texto o URL>", "play2", "playvid"];
handler.tags = ["descargas", "youtube"];
handler.command = ["play", "play2", "playvid"];

export default handler;
