module.exports = {
 config: {
 name: "fork",
 version: "1.6",
 author: "〲MAMUNツ࿐",
 countDown: 2,
 role: 0,
 shortDescription: "Official GitHub Fork",
 category: "utils",
 guide: {
 en: "{pn} | fork"
 }
 },

 langs: {
 en: {
 current: `
 ✦━━━━━━━━━✦
👑 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 𝗙𝗢𝗥𝗞 👑
✦━━━━━━━━━✦
👑 𝗢𝗪𝗡𝗘𝗥 ➜ 𝗛𝗔𝗠𝗜𝗠
🤖 𝗕𝗢𝗧 ➜ 𝗚𝗢𝗔𝗧 𝗕𝗢𝗧 𝗩𝟮
━━━━━━━━━━━
🌐 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 𝗚𝗜𝗧𝗛𝗨𝗕
🔗 https://github.𝗺𝘂𝗿𝗶𝗿_𝘀𝗮𝘁𝗲_𝗴𝗮𝗻𝗷𝗮_𝗺𝗶𝙨𝙞𝙮𝙚_𝗸𝗵𝗲𝘆𝗲_𝗺𝗼𝗿𝗲_𝗷𝗮𝘄_.𝗰𝗼𝗺
━━━━━━━━━━━
🎥 𝗩𝗜𝗗𝗘𝗢 𝗧𝗨𝗧𝗢𝗥𝗜𝗔𝗟 📺 https://vt.tiktok.com/ZSV1s2w27/
━━━━━━━━━━
𝗠𝗔𝗠𝗨𝗡 𝗚𝗢𝗔𝗧 𝗕𝗢𝗧 𝗩𝟮
✦━━━━━━━━━✦
`
 }
 },

 onStart: async function ({ message, getLang }) {
 const link = "https://github.𝗺𝘂𝗿𝗶𝗿_𝘀𝗮𝘁𝗲_𝗴𝗮𝗻𝗷𝗮_𝗺𝗶𝙨𝙞𝙮𝙚_𝗸𝗵𝗲𝘆𝗲_𝗺𝗼𝗿𝗲_𝗷𝗮𝘄_.𝗰𝗼𝗺";
 return message.reply(getLang("current", link));
 },

 onChat: async function ({ message, event, getLang }) {
 const body = event.body?.trim().toLowerCase();

 if (body === "fork") {
 const link = "https://github.𝗺𝘂𝗿𝗶𝗿_𝘀𝗮𝘁𝗲_𝗴𝗮𝗻𝗷𝗮_𝗺𝗶𝙨𝙞𝙮𝙚_𝗸𝗵𝗲𝘆𝗲_𝗺𝗼𝗿𝗲_𝗷𝗮𝘄_.𝗰𝗼𝗺";
 return message.reply(getLang("current", link));
 }
 }
};
