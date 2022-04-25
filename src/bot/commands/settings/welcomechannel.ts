import { GuildMember } from 'discord.js';
import { CustomArgs } from '@bot/modules/Commands';
export const builder = ['set'];
export const adminOnly = true;
export const aliases = ["wcc"]
export const exec = async (caller: GuildMember, args: string[], { Message, Client }: CustomArgs) => {
	const msg = await Message.channel.send(`Каннал привествий: ${await Client.getWelcomeChannel(Message.guildId)}`);
	Client.utils.deleteMessageTimeout(msg, 10000)
};
