import {
  Client,
  GatewayIntentBits,
  PermissionFlagsBits,
  type Message,
} from "discord.js";
import { logger } from "../lib/logger";
import { commands, buildEmbed } from "./commands";

export function startBot(): void {
  const token = process.env["DISCORD_BOT_TOKEN"];

  if (!token) {
    logger.warn("DISCORD_BOT_TOKEN not set — Discord bot will not start.");
    return;
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", () => {
    logger.info({ tag: client.user?.tag }, "Seung bot is online");
  });

  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return;

    const content = message.content.trim().toLowerCase();

    const match = commands.find(
      (cmd) => cmd.trigger.toLowerCase() === content,
    );

    if (!match) return;

    const member = message.guild?.members.cache.get(message.author.id);

    const isAdmin =
      member?.permissions.has(PermissionFlagsBits.Administrator) ?? false;

    if (!isAdmin) {
      await message.reply({
        content: "Only administrators can use this command.",
      });
      return;
    }

    try {
      const embed = buildEmbed(match);
      if (!message.channel.isSendable()) return;
      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      logger.error({ err, trigger: match.trigger }, "Failed to send embed");
    }
  });

  client.login(token).catch((err) => {
    logger.error({ err }, "Failed to log in to Discord");
  });
}
