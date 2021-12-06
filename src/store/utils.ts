import React from "react";
import { useLocation } from 'react-router-dom';

import { IArticle } from "./types";

const useQuery = () => {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
};

const loadMore = (userId: string, accessToken: string) => {
    console.log(userId, accessToken);
    // Funnel it from state
    const rankedBy = "engangement";
    const ge = fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/streams/contents?streamId=${encodeURI(`user/${userId}/category/global.all`)}&unreadOnly=true&ranked=${rankedBy}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }).then(r=>r.json())
    .then((res)=>res.items)
    .catch(e=>console.log(e));
    return ge;
};


export {
    useQuery,
    loadMore
};