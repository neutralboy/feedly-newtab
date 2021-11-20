import React from "react";

interface IAppContext{
    bgClass: string;
    num: number;
    loggedIn: boolean;
};

const defState: IAppContext = {
    bgClass: "bg-gray-900",
    num: 1,
    loggedIn: false
};

const AppContext = React.createContext<{ state: IAppContext, dispatch: React.Dispatch<AppActions> }>({
    state: defState,
    dispatch: () => undefined
});

interface IAppProvider{
    children: React.ReactElement;
};

enum AppActionEnum {
    Increment,
    Login
};

interface AppActions {
    type: AppActionEnum;
    payload?: number;
};

const AppReducer = (state: IAppContext, action: AppActions): IAppContext => {
    console.log(state);
    console.log( `%c${action.type}, %c${action.payload}`, 'color: green', 'color: yellow');
    switch(action.type) {

        case AppActionEnum.Increment:
            return {
                ...state,
                num: state.num + 1
            };

        case AppActionEnum.Login:
            return {
                ...state,
                loggedIn: true
            }

        default: 
            return state;
    };
};

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