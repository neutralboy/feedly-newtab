import { createRxDatabase, RxDatabase, getRxStoragePouch } from "rxdb";

interface IAppContext{
    bgClass: string;
    num: number;
    loggedIn: boolean;
    oAuthToken?: string;
    refreshToken?: string;
    accessToken?: string;
    loginLoading: boolean;
};

const db = await createRxDatabase<IAppContext>({
    name: "feedly-nt",
    storage: getRxStoragePouch("idb")
});

export {
    db
};