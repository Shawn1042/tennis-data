import { Client, GatewayIntentBits } from 'discord.js';
import { captureChart } from './captureChart.js'; // Importing captureChart using ES module syntax

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!playerstats')) {
    const playerName = message.content.split(' ').slice(1).join(' '); // Get player name after the command
    if (!playerName) {
      message.reply('Please provide a player name!');
      return;
    }

    try {
      // Capture the chart
      const screenshotPath = await captureChart(playerName);
      if (screenshotPath) {
        await message.channel.send({ files: [screenshotPath] });
      } else {
        message.reply("Couldn't generate the chart. Please try again.");
      }
    } catch (error) {
      console.error('Error generating chart:', error);
      message.reply("An error occurred while generating the chart. Please try again.");
    }
  }
});

// Add your Discord bot token here
client.login('YOUR_DISCORD_BOT_TOKEN_HERE');
