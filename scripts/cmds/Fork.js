module.exports = {
  config: {
    name: "fork",
    aliases: ["repo", "link"],
    version: "1.0",
    author: "Aphelion",
    countDown: 3,
    role: 0,
    longDescription: "Returns the link to the official, updated fork of the bot's repository.",
    category: "system",
    guide: { en: "{pn}" }
  },

  onStart: async function({ message }) {
    const text = "একটা সেক্সি গার্লফ্রেন্ড দিলে ফর্ক দিবো🥵 তোর বউয়ের ওই জায়গায় ummah 🥵🫦🌚👉👌\n\n" +
                 "┏━━━━━━━✦━━━━━━┓\n" +
                 "👑 𝗢𝗪𝗡𝗘𝗥 ➜ 𝗛𝗔𝗠𝗜𝗠\n" +
                 "🤖 𝗕𝗢𝗧 ➜ 𝗚𝗢𝗔𝗧 𝗕𝗢𝗧 𝗩𝟮\n" +
                 "┗━━━━━━━✦━━━━━━┛";
    
    message.reply(text);
  }
};
