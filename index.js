const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Europe/Berlin', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1111020519710527578')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/developer') //Must be a youtube video link 
    .setState('decay')
    .setName('owner')
    .setDetails(`/law for 23.381 servers [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1038784017203470408/1231996102039834694/766bce29f40ff5faa9e21515674dcd42.gif?ex=66288208&is=66273088&hm=26b999f4ea8d13134455d102c7e6f4a19c7290bd529dbf21dbb77eb5f4c85b2f&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('owner') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/emojis/967776024811147295.gif?size=96&quality=lossless') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('!!!') //Text when you hover the Small image
    .addButton('law', 'https://discord.com/')
    .addButton('selfish', 'https://e-z.bio/selfish');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `/law for 23.381 servers [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
