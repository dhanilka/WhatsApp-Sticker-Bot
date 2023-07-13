const { LocalAuth } =  require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr' , (qr)=>{
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message' , async (msg)=>{
    if( msg.type === 'image'){
        const media = await msg.downloadMedia();

        client.sendMessage(msg.from,media,{
            sendMediaAsSticker:true,
        });
    }else{
        msg.reply(` ⭐️ 𝐇𝐞𝐥𝐥𝐨 𝐰𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐭𝐡𝐞 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐁𝐨𝐭   🔥

✅ Send a photo with for convert it to sticker ✅
     
        
🌐 stickerBot v1(beta)
🟢 Bot by - Dhanilka `)
    }
})

client.initialize();
