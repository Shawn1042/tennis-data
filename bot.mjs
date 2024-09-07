import { Client, GatewayIntentBits } from 'discord.js';
import { captureChart } from './captureChart.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!playerstats')) {
    const playerName = message.content.split(' ').slice(1).join(' ');

    if (!playerName) {
      await message.reply('Please provide a player name!');
      return;
    }

    const replyMessage = await message.reply('Generating the chart, please wait...');

    try {
      const screenshotPath = await captureChart(playerName);

      if (screenshotPath) {
        // Edit the initial message with the chart
        await replyMessage.edit({ content: '', files: [screenshotPath] });
      } else {
        // Delete the initial message and send a new error message
        await replyMessage.delete();
        await message.reply("Couldn't generate the chart. Please try again.");
      }
    } catch (error) {
      console.error('Error generating chart:', error);
      await replyMessage.delete(); // Delete the initial message if there's an error
      await message.reply("An error occurred while generating the chart. Please try again.");
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
