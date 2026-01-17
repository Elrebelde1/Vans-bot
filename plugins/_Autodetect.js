import chalk from 'chalk'
import fetch from 'node-fetch'
import ws from 'ws'
let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync} from 'fs'
import path from 'path'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata}) {
    if (!m.messageStubType || !m.isGroup) return

    const fkontak = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "VansBot"
        },
        message: {
            locationMessage: {
                name: "🏁 𝕍𝕒𝕟𝕤 𝔹𝕠𝕥 🏁",
                jpegThumbnail: await (await fetch('https://files.catbox.moe/1j784p.jpg')).buffer(), // Cambia esta URL por el logo de Vans
                vcard:
                    "BEGIN:VCARD\n" +
                    "VERSION:3.0\n" +
                    "N:;Vans Bot;;;\n" +
                    "FN:Vans Bot\n" +
                    "ORG: Vans Community\n" +
                    "TITLE:\n" +
                    "item1.TEL;waid=19709001746:+1 (970) 900-1746\n" +
                    "item1.X-ABLabel:Vans Support\n" +
                    "X-WA-BIZ-DESCRIPTION:🏁 Off The Wall Style.\n" +
                    "X-WA-BIZ-NAME:Vans Bot\n" +
                    "END:VCARD"
            }
        },
        participant: "0@s.whatsapp.net"
    }

    let chat = global.db.data.chats[m.chat]
    let usuario = `@${m.sender.split`@`[0]}`
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'

    // --- DISEÑO DE MENSAJES REFORMULADO ---
    let nombre = `👟 *[ VANS - UPDATE ]* 👟\n\n┌─── ⋆⋅🏁⋅⋆ ───┐\n  *NUEVO NOMBRE:*\n  _${m.messageStubParameters[0]}_\n└─── ⋆⋅🏁⋅⋆ ───┘\n\n> 👤 Modificado por: ${usuario}`
    
    let foto = `📸 *VANS VISUALS*\n\nSe ha actualizado la imagen del grupo.\n\n> ⚡ *Responsable:* ${usuario}`
    
    let edit = `🛠️ *CONFIGURACIÓN VANS*\n\nEl acceso a los ajustes ha cambiado.\n\n> 🔐 *Privacidad:* ${m.messageStubParameters[0] == 'on' ? 'Solo Admins' : 'Cualquier skater'}`
    
    let newlink = `🔗 *NUEVA RUTA (Link)*\n\nEl enlace del grupo ha sido renovado.\n\n> 👟 *Action by:* ${usuario}`
    
    let status = `🚨 *ESTADO DEL CHAT*\n\nEl chat ha sido *${m.messageStubParameters[0] == 'on' ? 'CERRADO' : 'ABIERTO'}*.\n\n> 🛹 *Permisos:* ${m.messageStubParameters[0] == 'on' ? 'Solo Admins' : 'Público'}`
    
    let admingp = `🏁 *NUEVO STAFF*\n\nBienvenido al equipo de gestión:\n🚀 ${m.messageStubParameters[0].split`@`[0]}\n\n> ✨ *Asignado por:* ${usuario}`
    
    let noadmingp = `👟 *RETIRO DE STAFF*\n\nUn miembro ha dejado la administración:\n⚠️ @${m.messageStubParameters[0].split`@`[0]}\n\n> 💨 *Acción por:* ${usuario}`

    // --- LÓGICA DE ENVÍO ---
    if (chat.detect && m.messageStubType == 21) {
        await this.sendMessage(m.chat, { text: nombre, mentions: [m.sender]}, { quoted: fkontak})
    } else if (chat.detect && m.messageStubType == 22) {
        await this.sendMessage(m.chat, { image: { url: pp}, caption: foto, mentions: [m.sender]}, { quoted: fkontak})
    } else if (chat.detect && m.messageStubType == 23) {
        await this.sendMessage(m.chat, { text: newlink, mentions: [m.sender]}, { quoted: fkontak})
    } else if (chat.detect && m.messageStubType == 25) {
        await this.sendMessage(m.chat, { text: edit, mentions: [m.sender]}, { quoted: fkontak})
    } else if (chat.detect && m.messageStubType == 26) {
        await this.sendMessage(m.chat, { text: status, mentions: [m.sender]}, { quoted: fkontak})
    } else if (chat.detect && m.messageStubType == 29) {
        await this.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`]}, { quoted: fkontak})
    } else if (chat.detect && m.messageStubType == 30) {
        await this.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`]}, { quoted: fkontak})
    } else {
        console.log({
            messageStubType: m.messageStubType,
            messageStubParameters: m.messageStubParameters,
            type: WAMessageStubType[m.messageStubType],
        })
    }
}

export default handler
