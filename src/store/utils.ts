import React from "react";
import { useLocation } from 'react-router-dom';

import { IArticle } from "./types";
import { IUser } from "./Context";

const useQuery = () => {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
};

const loadMore = (user: IUser, accessToken: string) => {
    // Funnel it from state
    const rankedBy = "engangement";
    const ge = fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/streams/contents?streamId=${encodeURI(`user/${user.userId}/category/global.all`)}&unreadOnly=true&ranked=${rankedBy}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }).then(r=>r.json())
    .then(res=>res.items as IArticle[] )
    .catch(e=>console.log(e));
    return ge;
};


export {
    useQuery,
    loadMore
};