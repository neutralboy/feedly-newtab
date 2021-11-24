import React from "react";

import { IArticle } from "./types";

// User Data Type
interface IUser{
    userId: string;
    fullName: string;
}


// Article Ranking System
enum ERankedBy{
    Newest = "newest",
    Oldest = "oldest",
    Engangement = "engangement"
};

interface IAppContext{
    bgClass: string;
    num: number;
    loggedIn: boolean;
    oAuthToken?: string;
    refreshToken?: string;
    accessToken?: string;
    loginLoading: boolean;
    user?: IUser;
    rankedBy: ERankedBy,
    articles?: [IArticle],
    articleIds?: [string]
};

// Default Context
const defState: IAppContext = {
    bgClass: "bg-gray-900",
    num: 1,
    loggedIn: false,
    loginLoading: false,
    user: {
        userId: "",
        fullName: "Feedly User"
    },
    rankedBy: ERankedBy.Engangement
};

const AppContext = React.createContext<{ state: IAppContext, dispatch: React.Dispatch<AppActions> }>({
    state: defState,
    dispatch: () => undefined
});

interface IAppProvider{
    children: React.ReactElement;
};

enum AppActionEnum {
    Login,
    SetOAuthToken,
    SetAccessToken,
    SetRefreshToken,
    CheckLogin,
    SetUser,
    SetArticles,
    SetArticleIds
};

interface AppActions {
    type: AppActionEnum;
    payload?: string|IUser|[IArticle]|[string];
};


// App Reducer
const AppReducer = (state: IAppContext, action: AppActions): IAppContext => {
    console.log(action);
    console.log( `%c${action.type}, %c${action.payload}`, 'color: green', 'color: yellow');
    switch(action.type) {

        case AppActionEnum.Login:
            return {
                ...state,
                loggedIn: true
            };

        case AppActionEnum.SetOAuthToken:
            return {
                ...state,
                oAuthToken: action.payload as string,
                loginLoading: true
            };

        case AppActionEnum.SetAccessToken:
            return {
                ...state,
                accessToken: action.payload as string ,
                loggedIn: true,
                loginLoading: false
            };

        case AppActionEnum.SetRefreshToken:
            return {
                ...state,
                refreshToken: action.payload  as string 
            };

        case AppActionEnum.CheckLogin:
            return {
                ...state
            };

        case AppActionEnum.SetUser:
            return {
                ...state,
                user: {
                    fullName: action.payload as IUser["fullName"],
                    userId: action.payload as IUser["userId"]
                }
            }

        case AppActionEnum.SetArticleIds:
            return {
                ...state,
                articleIds: action.payload as [string]
            };

        case AppActionEnum.SetArticles:
            return {
                ...state,
                articles: action.payload as [IArticle]
            };


        default: 
            return state;
    };
};

// React Provider
const AppProvider = ({ children }: IAppProvider) => {
    const [state, dispatch] = React.useReducer(AppReducer, defState);
    return (
        <AppContext.Provider value={{ state, dispatch }} >
            {children}
        </AppContext.Provider>
    );
};

const AppConsumer = AppContext.Consumer;

export {
    AppContext,
    AppProvider,
    AppConsumer,
    AppReducer,
    AppActionEnum
};