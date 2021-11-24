import React, { useState, useContext, useEffect } from "react";

import {  AppContext, AppActionEnum } from "../store/Context";

interface IDAState{
    loading: boolean;
}

const DisplayArticle = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ displayLoadingState, setDisplayState ] = useState(false)


    useEffect(()=>{
        setDisplayState(true);
        const getUserID = async () => {
            const gui = await fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/auth/token`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.accessToken}`
                }
            });
            const guij = await gui.json();
            dispatch({
                type: AppActionEnum.SetUser,
                payload: {
                    fullName: guij.fullName,
                    userId: guij.id
                }
            });
        };
        getUserID();
        const getEntries = async () => {
            const ge = await fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/streams/ids?streamId=${encodeURI(state.user?.userId as string)}&unreadOnly=true&ranked=${state.rankedBy}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.accessToken}`
                }
            });
            const gej = await ge.json();

        };
    }, []);

    return (
        <div>

        </div>
    );
};

export default DisplayArticle;