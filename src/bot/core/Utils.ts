// import { Timer } from '../utils/Timer';

import { Guild, GuildChannel, GuildMember, Message, TextBasedChannels } from 'discord.js';
import { IOEClient } from './IOEClient';
export interface Utils {
	isAdmin(member: GuildMember): Boolean;
}
export class Utils {
	private client: IOEClient;
	constructor(client: IOEClient) {
		this.client = client;
	}
	public isAdmin(member: GuildMember) {
		if (this.isOwner(member)) return true;
		if (member.permissions.has('ADMINISTRATOR', true)) {
			return true;
		}
		const adminRoles: any[] = [];
		if (adminRoles.length > 0) {
			if (member.roles.cache.find((r) => adminRoles.indexOf(r.id) !== -1)) {
				return true;
			}
		}
		return false;
	}
	public isMod(member: GuildMember) {
		const modRoles: any[] = [];
		if (this.isAdmin(member)) return true;
		if (modRoles.length > 0) {
			if (member.roles.cache.find((r) => modRoles.indexOf(r.id) !== -1)) {
				return true;
			}
		}
	}
	public isOwner(member: GuildMember) {
		if (member.id === member.guild.ownerId) {
			return true;
		}
		return false;
	}
	public async getMemberFromMentions(mention: string, guild: Guild): Promise<GuildMember> {
		let usedID = mention.replace(/([^0-9])+/g, '');
		const member = await guild.members.fetch(usedID);
		return member;
	}
	public async getChannelFromMentions(mention: string, guild: Guild): Promise<TextBasedChannels> {
		let channelID = mention.replace(/([^0-9])+/g, '');
		const channel = await guild.channels.fetch(channelID);
		if (!channel.isText()) return null;
		return channel;
	}
	public async deleteMessageTimeout(message: Message, timeout: number) {
		setTimeout(() => {
			try {
				message.delete()
			} catch (e) {
				this.client.log('Message delete error:', e)
			}
		}, timeout)
	}
}
