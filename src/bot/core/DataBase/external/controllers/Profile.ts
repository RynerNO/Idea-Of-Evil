import Base from '@bot/core/Base';
import type {IOEClient} from '@bot/core/IOEClient';
import {Profile, ProfileModel} from '../models/Profile';

export default class ProfileController extends Base {
  private cache: Map<string, Profile>;

  private updated: string[];

  private dbWriteIntervalID!: NodeJS.Timeout;

  constructor(client: IOEClient) {
    super('GuildController', client);
    this.cache = new Map();

    this.updated = [];
  }

  overrideInit() {
    // Write all changes into db every 5 minutes
    this.dbWriteIntervalID = setInterval(() => {
      this.write();
    }, 300000);
  }

  public async get(id: string) {
    this.log(`Get value from db for ProfileID: ${id}`);
    let document: Profile | null;
    const tmp = this.cache.get(id);
    document =
      tmp !== undefined ? tmp : await ProfileModel.findOne({userID: id}).exec();

    if (document === null) {
      document = await ProfileModel.create({
        userID: id,
      });
    }
    this.cache.set(id, document);

    return document;
  }

  public async set(id: string, document: Profile) {
    this.log(`Set new value to cache for ProfileID:${id}.`);
    this.cache.set(id, document);
    this.updated.push(id);
  }

  public write() {
    if (this.updated.length < 1) {
      this.log('There are no updated cache');
      return false;
    }

    this.log('Write updated cache to db');
    this.updated.forEach(async id => {
      if (!this.cache.has(id)) return;
      await ProfileModel.updateOne({userID: id}, this.cache.get(id));
      this.cache.delete(id);
    });
    this.updated = [];
    this.log('Write updated cache to db finished');
    return true;
  }
}
