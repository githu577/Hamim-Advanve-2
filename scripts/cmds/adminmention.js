module.exports = {
  config: {
    name: "adminmention",
    version: "1.3.2",
    author: "〲MAMUNツ࿐ T.T　o.O",
    countDown: 0,
    role: 0,
    shortDescription: "Replies angrily when someone tags admins",
    longDescription: "If anyone mentions an admin, bot will angrily reply with random messages.",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const adminIDs = ["61590777101909", "61590558624840", "61590777101909"].map(String);

    // Skip if sender is admin
    if (adminIDs.includes(String(event.senderID))) return;

    // যদি কেউ মেনশন দেয়
    const mentionedIDs = event.mentions ? Object.keys(event.mentions).map(String) : [];
    const isMentioningAdmin = adminIDs.some(id => mentionedIDs.includes(id));

    if (!isMentioningAdmin) return;

    // র‍্যান্ডম রাগী রিপ্লাই
    const REPLIES = [
      "👑 হামিম বস এখন ব্যস্ত আছেন 😎",
      "☕ হামিম বস এখন নাস্তা করছেন, পরে কথা বলবেন 😋",
      "😴 হামিম বস এখন ঘুমাচ্ছেন, বিরক্ত করবেন না!",
      "📱 হামিম বস এখন ফোন নিয়ে ব্যস্ত আছেন",
      "🔥 হামিম বস আসতেছেন, সবাই লাইনে থাকেন!",
      "💼 হামিম বস এখন গুরুত্বপূর্ণ কাজে ব্যস্ত আছেন",
      "🍔 হামিম বস এখন খাবার খাচ্ছেন 😎",
      "🚫 হামিম বস এখন অ্যাভেইলেবল নেই",
      "⚡ হামিম বস এখন ফুল ব্যস্ত মোডে আছেন",
      "💎 VIP হামিম বস—একটু অপেক্ষা করুন",
      "🫡 হামিম বসের অর্ডারের অপেক্ষায় আছি",
      "🎧 হামিম বস এখন গান শুনছেন",
      "☕ হামিম বস এখন চা খেতে ব্যস্ত",
      "😂 হামিম বসকে ডাকতে হলে আগে অ্যাপয়েন্টমেন্ট নিতে হবে!",
      "👑 হামিম বস = সবার বস 😈",
      "😎 হামিম বস এখন ব্যস্ত আছেন, মেসেজ দেখে পরে রিপ্লাই দেবেন",
      "🔥 বস হামিম এখন VIP মুডে আছেন",
      "👑 হামিম বসের ব্যস্ততার সময়—দয়া করে অপেক্ষা করুন!"
    ];

    const randomReply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
    return message.reply(randomReply);
  }
};
