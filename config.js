const { readFileSync } = require('fs')
require('dotenv').config({path: './mongo.env'});
require('dotenv').config({path: './owner.env'});
require('dotenv').config({path: './session.env'});
require('dotenv').config({path: './bot.env'});

module.exports = {
    /**
     * bot details and parameters
     */
    botname: process.env.BotName || "Queen Anya Bot",
    footer: process.env.Footer || "© Queen Anya Bot",
    prefa: process.env.Prefix || "-",
    themeemoji: process.env.ThemeEmoji || "🎐",

    /**
     * owner details and parameters
     */
    ownername: process.env.Owner_Name || "Pika~Kun",
    ownernumber: process.env.Owner_Number || 2349163386884
    instagramId: process.env.Insta || "3.69_pika",

    /**
     * other details and parameters
     */
    author: process.env.Author || "@PikaBotz",
    packname: process.env.PackName || "Queen Anya v2 MD",
    socialLink: process.env.Web || "https://github.com/PikaBotz",
    groupLink: process.env.GcLink || "https://chat.whatsapp.com/E490r0wSpSr89XkCWeGtnX",
    warns: Number(process.env.Warn_Limits) || 3,
    cooldown: 5, // default cooldown time per command in seconds
    mongoUrl: process.env.MongoDB || "YOUR_MONGODB_URL",
    sessionId: process.env.SESSION_ID || "YOUR_SESSION_ID",eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUREUmZIMk1PR2ZrRFdOUWkzVXQyR0tTSjFpcGUzdmtpSStVNEYxMWcwQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzl3VjJzSWgzYjYrZTFDTVhyTGpSNy9FT3ZoR0dhaDFwT0hzOE9CdFIwST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSXUyU0R2M1llYkV0Yzgxa3BDZS9nRGpIWTV2RExVTVBlbTdSZjVTU2xvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2dmc3RTRZclJUV2o0NnhscTVxRGpJbU54eGVsWklwQm9vd3hYV0dod0ZvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFFaVN2czBNUnFRT00xZUwrd0VFTmRydDVoV29qT2UxQlk0OURlMlNkMUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFxc2hrczJFVzFQZi9iazF4enpMYjJnRHNzRkdjWVcxV0lzVldKc3ZLZ0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU9sTGZzYmF0VU9wV3p4OWpzZkM4VnZlYzJNMUNiU2RJSGpyMkFDZ1pWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaHFKazlwUXBRdnhGbXBvajA5cnFpaGsxZDA2RUhXaUJHTUFYVFZwNXNHND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZkKzF4cnBHTDdqSDRDNjlaK0VpVnIwTE1ReXliM3VXaWFBWEVaKzRjclUxdm9aYWFSRGphTFc4MHNTeklxZnJPTUxUSVJkaTFSZGd1KzE1V0FzdmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAxLCJhZHZTZWNyZXRLZXkiOiJPV2NHaHFrZU01U0w1TzlrVnRXc0VnMjJTNVpFN1VoRXdrRVcrbHkzamVNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqWW5tRlVLZ1JPYTdCQ2xsVjdnS3p3IiwicGhvbmVJZCI6IjNlNzJmMDkwLTk4YTQtNDc3ZC1hZTMxLTUxMDMwNTZjZmE1OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2OXVMNUlEYjluTzBSd2RDUm56YTZocEpLY1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaE5DTE52M1E4QXpIaXdKY2pPTHdsMzhabFRFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlAxU0U1UU5DIiwibWUiOnsiaWQiOiIyMzQ5MTYzMzg2ODg0OjExQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKEseKEm+KCs+KEleKEgsOYIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNcURxdDhDRU0rNTA3VUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJoSkt5L0hnaG03RGpaa0hxRW13dWswNG1Bc3RoQ2daS0QzNHhoWjZURlJzPSIsImFjY291bnRTaWduYXR1cmUiOiJRZnRpeGhLTm1UZmJoN0RyRGJWWDVjMFAwakFwdWIraDFyYklYejYvTTJ3WDlZUmIzRlN6bkw2eUtkbnIxaWplSzlUbC9vdTdqQlVhbHRFWHN6cTRBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOFRuWm1iSHZCVWNRMGZQRkQxb05SVUUvYXk5Z1VGYitkUG0yVFd5dVhhRGg0OThkRkF1SHpYM3lnTkZjN3Qrd3ltTXJhS3hGQjFHMDJWSXRXd3N5Z0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTYzMzg2ODg0OjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllTU3N2eDRJWnV3NDJaQjZoSnNMcE5PSmdMTFlRb0dTZzkrTVlXZWt4VWIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMxMjkwNTMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTDFwIn0=

    /**
     * thumbnails and medias
     */
    image_1: readFileSync('./lib/Assets/image_1.jpg'), // primary image
    image_2: readFileSync('./lib/Assets/image_2.jpg'), // secondry image
    imageUrl: "https://i.ibb.co/ZKKSZHT/Picsart-23-06-24-13-36-01-843.jpg", // image url, to replace to your url upload your image to https://imgbb.com
    imageMentionUrl: "https://i.ibb.co/ZKKSZHT/Picsart-23-06-24-13-36-01-843.jpg", // image for mention reply audio media
    aliveMedia: readFileSync("./lib/Assets/aliveMedia.mp4"),
    menuMedia: readFileSync('./lib/Assets/menuMedia.mp4'),
    ownerMentionMp3: readFileSync('./lib/Assets/ownerMentionMp3.mp3'),  // audio for mention reply audio media

    /**
     * core parameters and values
     */
    ownercon: { key: { fromMe: false, participant: '0@s.whatsapp.net', ...({ remoteJid: 'status@broadcast' }), }, message: { contactMessage: { displayName: this.ownername, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${this.ownername},;;;\nFN:${this.ownername}\nitem1.TEL;waid=${this.ownernumber}:${this.ownernumber}\nitem1.X-ABLabel:Mobile\nEND:VCARD`, jpegThumbnail: this.image_2, thumbnail: this.image_2, sendEphemeral: true } } },
    fakeshop: { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" }, message: { orderMessage: { itemCount: 1234, status: 200, thumbnail: this.image_1, surface: 200, message: this.botname, orderTitle: this.ownername, sellerJid: '0@s.whatsapp.net'}}, contextInfo: { forwardingScore: 999, isForwarded: true}, sendEphemeral: true },
    message: {
        success: "✅ 𝚂𝚞𝚌𝚌𝚎𝚜𝚜! 𝙾𝚙𝚛𝚊𝚝𝚒𝚘𝚗 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎𝚍.",
        admin: "*👤 A𝙳𝙼𝙸𝙽 N𝙴𝙴𝙳𝙴𝙳!*\n\n- Dear, this command is only for Admins. You have to be a admin in this group to use this command.",
        botAdmin: "*🤖 B𝙾𝚃 A𝙳𝙼𝙸𝙽 N𝙴𝙴𝙳𝙴𝙳!*\n\n- I'm not an Admin, so I can't execute this command in this group. Please make me an Admin.",
        owner: "*👑 O𝚆𝙽𝙴𝚁 N𝙴𝙴𝙴𝙳𝙴𝙳!*\n\n- Bruh, this command is only made for this bot's owner. So you can't use this command.",
        group: "*👥 G𝚛𝚘𝚞𝚙 N𝚎𝚎𝚍𝚎𝚍!*\n\n- This command can only be executed in a group chat.",
        private: 'This command is only for private chats.',
        wait: '🔄 Processing request...',
        error: "❌ Oops! An error occurred while processing your request. Please try again later.",
        ban: `You're banned from using this bot!`,
        nsfw: 'This group is not *NSFW* enabled.',
        banChat: 'This group is banned from using this bot, please contact owner to get unbanned.'
    }
}
