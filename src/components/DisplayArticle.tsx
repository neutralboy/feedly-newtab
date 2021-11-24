import React, { useState, useContext, useEffect } from "react";

import {  AppContext, AppActionEnum } from "../store/Context";


const DisplayArticle = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ displayLoadingState, setDisplayState ] = useState(false)


    useEffect(()=>{
        setDisplayState(true);
        const getEntries = async (userId: string) => {
            const ge = await fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/streams/contents?streamId=${encodeURI(`user/${userId}/category/global.all`)}&unreadOnly=true&ranked=${state.rankedBy}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.accessToken}`
                }
            });
            const gej = await ge.json();
            dispatch({ type: AppActionEnum.SetArticles, payload: gej.items });
            setDisplayState(false);
        };
        

        fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.accessToken}`
            }
        }).then(r=>r.json()).then((res)=>{
            dispatch({
                type: AppActionEnum.SetUser,
                payload: {
                    fullName: res.fullName,
                    userId: res.id
                }
            });
            getEntries(res.id);
        }).catch(e=>console.log(e));
    }, []);

    return (
        <div>
            {
                displayLoadingState &&  <div className="bg-gray-800 rounded-md shadow-lg w-1/3 mx-auto p-6 px-8">
        
                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
      
              </div>
            }
            <div className="lg:container grid grid-cols-4 animate__fadeInUp animate__slow" >
                {
                    state.articles?.map(i=>
                            <div key={Math.random()} className="m-3 col-span-1 bg-gray-800 p-3 rounded-md shadow-md hover:shadow-xl flex-col animate__fadeInUp animate__slow" >
                                <div>
                                    <img className="w-full" src={i.visual?.url ? i.visual.url : "https://res.cloudinary.com/poorna/image/upload/c_scale,q_auto,w_350/v1637777081/feedly-logo-0bc7db153a894d0aa90b5ed31eec0398.png" } alt={i.title} />
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
                                <a href={i.alternate[0].href} className="text-2xl text-white mt-3 block font-display hover:underline" > {i.title} </a>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default DisplayArticle;