const express = require('express');
const app = express();
const port = 2000;
const { LocalAuth } = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');

const launchOptions = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  executablePath: '/usr/bin/chromium-browser', // Set the path to your manually installed Chromium
};

async function startPuppeteer() {
  const browser = await puppeteer.launch(launchOptions);
  return browser;
}

(async () => {
  const browser = await startPuppeteer();
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: browser,
  });

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log(qr);
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('message', async (msg) => {
    if (msg.type === 'image') {
      const media = await msg.downloadMedia();
      client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
    } else {
      msg.reply(` ⭕️ 𝐇𝐞𝐥𝐥𝐨 𝐰𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐭𝐡𝐞 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐁𝐨𝐭 

      *Send a photo to convert it into a sticker*
      🌐 stickerBot v1(beta)
      🟢 Bot by - Dhanilka`);
    }
  });

  client.initialize();

  app.listen(port, () => console.log(`App listen on port ${port}`));
})();
