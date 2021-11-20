import Dexie, { Table } from 'dexie';


interface LoginStamps {
    id?: number;
    timestamp: Date;
};

class MySubClassDexie extends Dexie{
    loginStamps?: Table<LoginStamps>;

    constructor() {
        super("feedlyTab");
        this.version(1).stores({
            loginStamps: '++id timestamp'
        });
    }
};

const db = new MySubClassDexie();

export {
    MySubClassDexie,
    db
}