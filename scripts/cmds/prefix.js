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

// 📌 এখানে একটি সরাসরি Working GIF / Image URL রাখা হয়েছে:
const DIRECT_GIF = "https://i.imgur.com/7Ce2tly.gif"; 

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
├‣ ғв : —͞Hꫝᴍɪᴍ⎯♡︎💋🌷
╰────────────◊`;

    const cacheDir = path.dirname(cachePath);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    // single GIF Download
    const response = await axios.get(DIRECT_GIF, { responseType: "stream" });
    const writer = fs.createWriteStream(cachePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      message.reply(
        {
          body: statusText,
          attachment: fs.createReadStream(cachePath)
        },
        () => {
          if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
        }
      );
    });

    writer.on("error", (err) => {
      console.error("Stream write error:", err);
      message.reply(statusText);
    });

  } catch (err) {
    console.error("[prefix.js]", err);
    if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
    return message.reply(statusText || "❌ Error showing prefix status.");
  }
}

module.exports = {
  config: {
    name: "prefix",
    version: "3.3.0",
    author: "MJ Hamim",
    countDown: 5,
    role: 0,
    description: "Show bot prefix with a single GIF",
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

    // প্রিফিক্স সহ দিলে ২ বার আসা আটকাবে
    const systemPrefix = global.GoatBot.config.prefix;
    if (event.body.startsWith(systemPrefix)) return;

    const lowerBody = event.body.trim().toLowerCase();
    if (!TRIGGER_WORDS.includes(lowerBody)) return;

    return showPrefixStatus(ctx);
  }
};
