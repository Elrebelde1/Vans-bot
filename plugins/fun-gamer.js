
const handler = async (m, { conn, args}) => {
    if (!args[0]) {
        return await conn.sendMessage(m.chat, {
            text: '❗ *Debes proporcionar un número de teléfono.*\n\nEjemplo:\n`.checkwa 5212345678901`'
});
}

    let number = args[0].replace(/\D/g, '') + '@s.whatsapp.net';

    try {
        const [result] = await conn.onWhatsApp(number);
        if (result?.exists) {
            await conn.sendMessage(m.chat, {
                text: `✅ El número *${args[0]}* está *registrado* en WhatsApp.`
});
} else {
            await conn.sendMessage(m.chat, {
                text: `❌ El número *${args[0]}* *no está registrado* en WhatsApp.`
});
}
} catch (error) {
        await conn.sendMessage(m.chat, {
            text: `⚠️ No se pudo verificar el número. Puede estar *baneado* o hay un error de conexión.`
});
        console.error('Error al verificar número:', error);
}
};

handler.command = ['wa', 'verificarnumero'];
export default handler;