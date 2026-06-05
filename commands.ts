import { EmbedBuilder, type ColorResolvable } from "discord.js";

export interface CommandConfig {
  trigger: string;
  embed: {
    title: string;
    description: string;
    color: ColorResolvable;
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: string;
    thumbnail?: string;
  };
}

export const commands: CommandConfig[] = [
  {
    trigger: "!rules",
    embed: {
      title: "📋 Server Rules",
      color: "#5865F2",
      description:
        "Welcome! Please read and follow these rules to keep our community a great place for everyone.",
      fields: [
        {
          name: "1. Be Respectful",
          value:
            "Treat all members with kindness. No harassment, hate speech, or personal attacks.",
        },
        {
          name: "2. No Spam",
          value:
            "Do not flood channels with repeated messages, excessive caps, or irrelevant links.",
        },
        {
          name: "3. Keep It On-Topic",
          value: "Use the appropriate channels for your messages and questions.",
        },
        {
          name: "4. No NSFW Content",
          value:
            "Keep all content safe for work unless in a designated NSFW channel.",
        },
        {
          name: "5. Follow Discord ToS",
          value:
            "All members must comply with [Discord's Terms of Service](https://discord.com/terms).",
        },
        {
          name: "⚠️ Violations",
          value:
            "Breaking these rules may result in a warning, mute, kick, or ban.",
        },
      ],
      footer: "Last updated by the moderation team",
    },
  },
  {
    trigger: "!about-us",
    embed: {
      title: "✨ About Us",
      color: "#57F287",
      description:
        "Welcome to our community! Here's a little about who we are and what we're all about.",
      fields: [
        {
          name: "🌍 Our Mission",
          value:
            "We're a friendly, growing community built around shared interests and good vibes.",
        },
        {
          name: "💬 What We Offer",
          value:
            "Active discussions, helpful members, events, and a place to hang out.",
        },
        {
          name: "🤝 How to Get Involved",
          value:
            "Introduce yourself in #introductions, grab some roles, and jump into the conversation!",
        },
      ],
      footer: "Glad to have you here!",
    },
  },
];

export function buildEmbed(config: CommandConfig): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(config.embed.title)
    .setDescription(config.embed.description)
    .setColor(config.embed.color)
    .setTimestamp();

  if (config.embed.fields) {
    embed.addFields(config.embed.fields);
  }

  if (config.embed.footer) {
    embed.setFooter({ text: config.embed.footer });
  }

  if (config.embed.thumbnail) {
    embed.setThumbnail(config.embed.thumbnail);
  }

  return embed;
}
