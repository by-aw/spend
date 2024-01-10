// db.ts
import Dexie, { Table } from 'dexie';

export interface Expense {
  id?: number;
  groupId: number;
  store: string;
  time: string;
  amount: string;
  notes: string;
}

export interface Group{
  id?: number;
  name: string;
}

export class MySubClassedDexie extends Dexie {
  expenses!: Table<Expense>;
  groups!: Table<Group>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      expenses: '++id, groupId, store, time, amount, notes',
      groups: '++id, name',
    });
  }
}

export const db = new MySubClassedDexie();