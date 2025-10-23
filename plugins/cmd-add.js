
const handler = async (m, { conn, text, usedPrefix, command}) => {
  global.db.data.sticker = global.db.data.sticker || {};

  const quoted = m.quoted;
  if (!quoted || quoted.mtype!== 'stickerMessage') {
    throw '*Por favor, responde a un sticker válido para agregar el comando.*';
}

  const fileSha256 = quoted.fileSha256;
  if (!fileSha256 ||!(fileSha256 instanceof Buffer)) {
    throw '*No se pudo obtener el hash del sticker. Asegúrate de que sea un sticker válido.*';
}

  if (!text) {
    throw `*Falta el texto para el comando.*\n*—◉ ${usedPrefix + command} <texto>*\n\n*Ejemplo:*\n*—◉ ${usedPrefix + command} hola*`;
}

  const sticker = global.db.data.sticker;
  const hash = fileSha256.toString('base64');

  if (sticker[hash] && sticker[hash].locked) {
    throw '*No puedes modificar este comando, está bloqueado.*';
}

  sticker[hash] = {
    text,
    mentionedJid: await m.mentionedJid,
    creator: m.sender,
    at: Date.now(),
    locked: false
};

  m.reply('*✅ Comando agregado al sticker correctamente.*');
};

handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset'];
handler.rowner = true;

export default handler;