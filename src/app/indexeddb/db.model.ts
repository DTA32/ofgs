import Dexie, { Table } from 'dexie';

export interface FavoriteGame {
  id?: number;
  gameId: string;
  favoritedAt: Date;
}

export class DB extends Dexie {
  
  favorites!: Table<FavoriteGame>;

  constructor() {
    super('dfgsDB');
    this.version(1).stores({
      favorites: '++id, gameId, favoritedAt',
    });
  }
}

export const db = new DB();
