import { GuildMember } from 'discord.js';
import { CustomArgs } from '@bot/modules/Commands';
export const ownerOnly = true;
export const builder = ['sync'];
export const exec = async (caller: GuildMember, args: string[], { Message, Client }: CustomArgs) => { };