import React, {useState, useContext} from "react";

import { AppActionEnum, AppConsumer, AppContext } from "../store/Context";

interface IAllCaughtUp {
    loading: boolean;
    allCaughtUp: boolean;
    cardBg: string;
    bg: string;
    id?: string;
};

const AllCaughtUp = ({ loading, allCaughtUp, cardBg, bg, id }: IAllCaughtUp) => {

    const [dLoading, setLoading] = useState(false);
    const { dispatch } = useContext(AppContext);

    const dLoadMore = async (id: string, accessToken: string) => {
        setLoading(true);
        const rankedBy = "engagement";
        const dlm = await fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/streams/contents?streamId=${encodeURI(`user/${id}/category/global.all`)}&unreadOnly=true&ranked=${rankedBy}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const dlmj = await dlm.json();
        dispatch({
            type: AppActionEnum.SetArticles,
            payload: dlmj.items
        });
        setLoading(false);
    };

    if (dLoading||loading){

    }

    return (
        <AppConsumer>
        {
            (c) => (
        <div className={`${c.state.bgClass1} rounded-md shadow-lg w-1/3 mx-auto p-6 px-8`}>

            <div className="mx-auto text-center" >
                {
                    (dLoading||loading) ? 
                    <p className="text-gray-500" >Loading fresh new articles for you......</p>
                    :
                    <div>
                        <p className="text-xl text-gray-200 font-display" > Thats it for now! </p>
                        <button onClick={()=>dLoadMore( (c.state.userId ? c.state.userId: "" ), (c.state.accessToken ? c.state.accessToken : "" ) )} className={`text-gray-500 mt-3 hover:${c.state.bgClass} px-3 py-2`} >
                            <svg className="inline fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4H8V6.55709C9.19001 5.622 10.6906 5.0643 12.3214 5.0643C16.1874 5.0643 19.3214 8.19831 19.3214 12.0643C19.3214 15.9303 16.1874 19.0643 12.3214 19.0643C10.171 19.0643 8.24696 18.0946 6.96289 16.5685L8.58221 15.3837C9.49811 16.4147 10.8339 17.0643 12.3214 17.0643C15.0829 17.0643 17.3214 14.8257 17.3214 12.0643C17.3214 9.30288 15.0829 7.0643 12.3214 7.0643C11.2346 7.0643 10.2288 7.41107 9.4085 8L12 8V10H6V4Z"></path>
                            </svg>
                            Load More
                        </button>
                    </div>

                }

            </div>

        </div>
            )
        }
    </AppConsumer>
    );
};

export default AllCaughtUp;