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
    bgClass1: string;
    num: number;
    loggedIn: boolean;
    oAuthToken?: string;
    refreshToken?: string;
    accessToken?: string;
    loginLoading: boolean;
    rankedBy: ERankedBy;
    articles?: IArticle[];
    articleIds?: string[];
    userId?: string;
    fullName?: string;
};

// Default Context
const defState: IAppContext = {
    bgClass: "bg-gray-900",
    bgClass1: "bg-gray-800",
    num: 1,
    loggedIn: false,
    loginLoading: false,
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
    SetUserId,
    SetUserName,
    SetArticles,
    SetArticleIds,
    MarkArticleAsRead
};

interface AppActions {
    type: AppActionEnum;
    payload?: string|IUser|IArticle[]|[string];
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
                accessToken: action.payload as string,
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

        case AppActionEnum.SetUserId:
            return {
                ...state,
                userId: action.payload as string
            };

        case AppActionEnum.SetUserName:
            return {
                ...state,
                fullName: action.payload as string
            }

        case AppActionEnum.SetArticleIds:
            return {
                ...state,
                articleIds: action.payload as [string]
            };

        case AppActionEnum.SetArticles:
            console.log("ARTICLES: ", state.articles?.length);
            return {
                ...state,
                articles: action.payload as [IArticle]
            };

        case AppActionEnum.MarkArticleAsRead:
            return {
                ...state,
                articles: state.articles?.filter(a => a.id !== action.payload as string)
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

export type {
    IUser
};

export {
    AppContext,
    AppProvider,
    AppConsumer,
    AppReducer,
    AppActionEnum
};