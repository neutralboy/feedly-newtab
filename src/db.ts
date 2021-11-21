import Dexie, { Table } from 'dexie';


interface LoginStamps {
    id?: number;
    timestamp: Date;
};

interface AccessTokens {
    id?: number;
    timestamp: Date;
    accessToken: string;
    refreshToken: string; 
    expiresIn: string;
}

class MySubClassDexie extends Dexie{
    loginStamps?: Table<LoginStamps>;
    accessTokens?: Table<AccessTokens>;

    constructor() {
        super("feedlyTab");
        this.version(1).stores({
            loginStamps: '++id timestamp',
            accessTokens: '++id timestamp'
        });
    }
};

const db = new MySubClassDexie();

export {
    MySubClassDexie,
    db
}