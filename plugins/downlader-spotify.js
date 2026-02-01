import axios from 'axios';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONTADOR_PATH = join(__dirname, '.contador_spotify.txt');

/**
 * Registra la cantidad de descargas realizadas
 */
function contarDescarga() {
  let contador = 0;
  if (existsSync(CONTADOR_PATH)) {
    try {
      contador = parseInt(readFileSync(CONTADOR_PATH, 'utf8')) || 0;
    } catch (e) {
      console.error('Error al leer contador:', e);
    }
  }
  contador += 1;
  writeFileSync(CONTADOR_PATH, String(contador));
  return contador;
}

/**
 * Valida si el texto es un link de Spotify
 */
const isSpotifyURL = (url) => /^(https?:\/\/)?(open\.)?spotify\.com\/(track|album|playlist)\/.+/i.test(url);

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`👟 *[ 𝖁𝖆𝖓𝖘 𝕭𝖔𝖙 ]* 👟\n\nUso correcto:\n> *${usedPrefix}${command}* <nombre de la canción o link>`);
  }

  try {
    const query = args.join(" ");
    await m.react('🎧');

    let spotifyUrl = query;

    // 1. Búsqueda: Si no es URL, buscamos el link primero
    if (!isSpotifyURL(query)) {
      const searchRes = await axios.get(`https://api.delirius.store/search/spotify?q=${encodeURIComponent(query)}&limit=1`);
      if (!searchRes.data.status || searchRes.data.data.length === 0) {
        return m.reply('❌ No encontré resultados para esa canción.');
      }
      spotifyUrl = searchRes.data.data[0].url;
    }

    await m.react('📥');
    
    // 2. Descarga: Obtenemos el link del MP3 y la info detallada
    const downloadRes = await axios.get(`https://api.delirius.store/download/spotifydl?url=${encodeURIComponent(spotifyUrl)}`);
    
    if (!downloadRes.data.status) {
      return m.reply('❌ Error al obtener el archivo de audio.');
    }

    const { title, author, image, download } = downloadRes.data.data;

    // 3. Envío: Mandamos el audio con la carátula y metadatos
    await m.react('📤');

    // Obtenemos la imagen como buffer para la miniatura
    let albumArt;
    try {
      const imgRes = await axios.get(image, { responseType: 'arraybuffer' });
      albumArt = Buffer.from(imgRes.data, 'binary');
    } catch {
      albumArt = Buffer.alloc(0); // Si falla, se envía sin miniatura personalizada
    }

    await conn.sendMessage(m.chat, {
      audio: { url: download },
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: `🎵 ${title}`,
          body: `Artista: ${author || 'Spotify Artist'}`,
          previewType: 'PHOTO',
          thumbnail: albumArt,
          sourceUrl: spotifyUrl
        }
      }
    }, { quoted: m });

    contarDescarga();
    await m.react('✅');

  } catch (error) {
    console.error(error);
    await m.react('❌');
    m.reply(`⚠️ *Error:* Hubo un problema al procesar tu solicitud.`);
  }
};

handler.help = ['spotify <búsqueda/url>'];
handler.tags = ['descargas'];
handler.command = /^(spotify|sp)$/i;

export default handler;
