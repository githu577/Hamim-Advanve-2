const axios = require("axios");
const fs = require("fs");
const path = require("path");

const userPrefixPath = path.join(__dirname, "noprefix", "userPrefix.json");

function loadUserPrefix() {
  try {
    if (!fs.existsSync(userPrefixPath)) {
      fs.mkdirSync(path.dirname(userPrefixPath), { recursive: true });
      fs.writeFileSync(userPrefixPath, JSON.stringify({}, null, 2));
    }
    return JSON.parse(fs.readFileSync(userPrefixPath, "utf-8"));
  } catch (err) {
    console.error("[prefix.js - loadUserPrefix]", err);
    return {};
  }
}

const TRIGGER_WORDS = ["prefix", "prefix bot là gì", "quên prefix r", "dùng sao"];

// 📌 আপনার পছন্দের ৩টি GIF/Image Direct Link এখানে দিন:
const GIF_LINKS = [
  "https://i.imgur.com/lVpciqC.gif",
  "https://i.imgur.com/lVpciqC.gif",
  "https://i.imgur.com/lVpciqC.gif"
];

async function showPrefixStatus({ event, message, threadsData }) {
  const { threadID, senderID } = event;
  let statusText = "";
  const cachePath = path.join(__dirname, "cache", `prefix_${Date.now()}.gif`);

  try {
    // System + group prefix
    const systemPrefix = global.GoatBot.config.prefix;
    let groupPrefix = systemPrefix;
    try {
      groupPrefix = (await threadsData.get(threadID, "data.prefix")) || systemPrefix;
    } catch (err) {
      console.error("[prefix.js - get thread prefix]", err);
    }

    // Personal prefix
    const userPrefixData = loadUserPrefix();
    const ownPrefix = userPrefixData[String(senderID)];

    statusText = `╭─‣ вσт ѕтαтυѕ
├‣ ѕуѕтєм : ${systemPrefix}
├‣ ɢʀᴏᴜᴘ : ${groupPrefix}`;

    if (ownPrefix) {
      statusText += `\n├‣ уσυʀ σwɴ : ${ownPrefix}`;
    }

    statusText += `
├‣ ғʙ : —͞Hꫝᴍɪᴍ⎯♡︎💋🌷
╰────────────◊`;

    // র্যান্ডম GIF লিংক সিলেক্ট করা
    const randomLink = GIF_LINKS[Math.floor(Math.random() * GIF_LINKS.length)];

    // ক্যানসেল ফিল্ড তৈরি থাকলে cache ফোল্ডার চেক
    const cacheDir = path.dirname(cachePath);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    // GIF ডাউনলোড করা
    const response = await axios.get(randomLink, { responseType: "arraybuffer" });
    fs.writeFileSync(cachePath, Buffer.from(response.data, "binary"));

    // মেসেজ রিপ্লাই দেওয়া
    await message.reply({
      body: statusText,
      attachment: fs.createReadStream(cachePath)
    });

    // সাময়িক ডাউনলোড করা ফাইলটি ডিলেট করে ক্লিন রাখা
    if (fs.existsSync(cachePath)) {
      fs.unlinkSync(cachePath);
    }
  } catch (err) {
    console.error("[prefix.js]", err);
    if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
    return message.reply(statusText || "❌ Error showing prefix status.");
  }
}

module.exports = {
  config: {
    name: "prefix",
    version: "3.1.0",
    author: "MJ Hamim",
    countDown: 5,
    role: 0,
    description: "Show bot prefix with random GIF link",
    category: "system",
    guide: {
      en: "   {p}prefix: show system/group/your own prefix"
    }
  },

  onStart: async function (ctx) {
    return showPrefixStatus(ctx);
  },

  onChat: async function (ctx) {
    const { event } = ctx;
    if (!event.body) return;

    const lowerBody = event.body.trim().toLowerCase();
    if (!TRIGGER_WORDS.includes(lowerBody)) return;

    return showPrefixStatus(ctx);
  }
};
