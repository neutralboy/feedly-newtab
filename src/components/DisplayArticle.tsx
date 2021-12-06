import React, { useState, useContext, useEffect } from "react";

import {  AppContext, AppActionEnum, AppConsumer } from "../store/Context";
import AllCaughtUp from "./AllCaughtUp";
import ImageLoader from "../components/placeholders/ImageLoader";


const DisplayArticle = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ displayLoadingState, setDisplayState ] = useState(false)

    const getEntries = async (userId: string) => {
        console.log(userId);
        setDisplayState(true);
        const ge = await fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/streams/contents?streamId=${encodeURI(`user/${userId}/category/global.all`)}&unreadOnly=true&ranked=${state.rankedBy}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.accessToken}`
            }
        });
        const gej = await ge.json();
        dispatch({ type: AppActionEnum.SetArticles, payload: gej.items });
        setDisplayState(false);

        return;
    };

    useEffect(()=>{
        setDisplayState(true);

        fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.accessToken}`
            }
        }).then(r=>r.json()).then((res)=>{
            dispatch({
                type: AppActionEnum.SetUserId,
                payload: res.id
            });
            dispatch({
                type: AppActionEnum.SetUserName,
                payload: res.fullName
            });
            getEntries(res.id);
        }).catch(e=>console.log(e));
    }, []);

    const markAsRead = async (id: string) => {
        dispatch({
            type: AppActionEnum.MarkArticleAsRead,
            payload: id
        });
        const mr = await fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/markers`, {
            method: "POST",
            body: JSON.stringify({
                action: "markAsRead",
                type: "entries",
                entryIds: [
                    id
                ]
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.accessToken}`
            }
        });

    };

    return (
        <div>


            <AppConsumer>
                {
                    (ctx) => (
                        <div>
                            {
                                ctx.state.articles && (ctx.state.articles.length === 0 ) && <AllCaughtUp loading={displayLoadingState} cardBg={state.bgClass1} bg={state.bgClass} allCaughtUp={ctx.state.articles.length > 0 } />
                            }

                        </div>
                    )
                }
            </AppConsumer>

            {
                state.articles && state.articles!.length > 0 && <div>
                    <div className="lg:container grid 2xl:grid-cols-4 md:grid-cols-3 animate__fadeInUp animate__slow" >
                        {
                            state.articles?.map(i=>
                                    <div key={Math.random()} className="m-3 col-span-1 bg-gray-800 pt-3 rounded-md shadow-md hover:shadow-xl animate__fadeInUp animate__slow flex flex-col justify-between cursor-pointer" >
                                        <div className="px-3" > 
                                            <div>
                                                <ImageLoader alt={i.title} imageUrl={i.visual?.url} />
                                            </div>
                                            <div className="flex justify-between mx-3 mt-3" >
                                                <a href={i.origin.htmlUrl} className="text-feedly block my-auto hover:text-green-700" >{i.origin.title}</a>
                                                <div className="my-auto" >
                                                    {
                                                        i.categories.map(e=>
                                                            <span key={Math.random()} className="text-gray-300 block py-0.5 px-2 bg-green-800" >
                                                                {e.label}
                                                            </span>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                            <h3  className="text-2xl text-white mt-3 block font-display hover:underline" > {i.title} </h3>
                                        </div>
                                        <div className="flex flex-row justify-between mt-6 h-12" >
                                            <a target="_blank" rel="noreferrer" href={i.alternate[0].href} className="block text-center py-3 px-2 bg-feedly hover:bg-green-600 w-full h-full rounded-bl-md text-white" >
                                                Open
                                                <svg className="inline fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.001 20H6.00098C4.89641 20 4.00098 19.1046 4.00098 18V7C4.00098 5.89543 4.89641 5 6.00098 5H10.001V7H6.00098V18H17.001V14H19.001V18C19.001 19.1046 18.1055 20 17.001 20ZM11.701 13.707L10.291 12.293L16.584 6H13.001V4H20.001V11H18.001V7.415L11.701 13.707Z"></path>
                                                </svg>

                                            </a>
                                            <button onClick={()=>markAsRead(i.id)} className="block bg-blue-500 hover:bg-blue-600 px-2 py-1 w-full h-full rounded-br-md text-white" >
                                                <svg className="inline fill-current mr-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.332764 13.0651L5.98804 18.7204L7.39804 17.3004L1.74775 11.6501L0.332764 13.0651ZM22.2473 5.28117L11.648 15.8904L7.41118 11.6435L5.98118 13.0535L11.648 18.7204L23.6673 6.70117L22.2473 5.28117ZM18.0089 6.69959L16.5989 5.27959L10.228 11.6504L11.648 13.0604L18.0089 6.69959Z"></path>
                                                </svg>
                                                Mark as Read
                                            </button>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            }

        </div>
    );
};

export default DisplayArticle;