import Dexie, { Table } from 'dexie';


interface LoginStamps {
    id?: number;
    timestamp: Date;
};

interface IoAuthTokens {
    id?: number;
    timestamp: Date;
    token: string;
}

interface AccessTokens {
    id?: number;
    timestamp: Date;
    accessToken: string;
    refreshToken: string; 
    expiresIn: string;
}

class MySubClassDexie extends Dexie{
    loginStamps!: Table<LoginStamps>;
    accessTokens!: Table<AccessTokens>;
    oAuthTokens!: Table<IoAuthTokens>

    constructor() {
        super("feedlyTab");
        this.version(1).stores({
            loginStamps: '++id timestamp',
            accessTokens: '++id timestamp',
            oAuthTokens: '++id timestamp',
        });
    }
};

const db = new MySubClassDexie();

export {
    MySubClassDexie,
    db
}