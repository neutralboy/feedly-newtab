import React, {useContext, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';

import { AppActionEnum, AppContext} from './store/Context';
import DisplayArticle from './components/DisplayArticle';
import LoginComponent from './components/LoginComponent';
import { useQuery } from './store/utils';


const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const query = useQuery();
  let history = useNavigate();


  useEffect(()=>{
      // Get access code and login
  const getAccessCode = async () => {
    if(query.get("code")){
      dispatch({ type: AppActionEnum.SetOAuthToken, payload: query.get("code")?.toString() });
      history("/");

      const aT = await fetch(`${process.env.REACT_APP_FEEDLY_ROOT}/v3/auth/token`, {
                  method: "post",
                  body: JSON.stringify({
                      code: query.get("code")?.toString(),
                      client_id: process.env.REACT_APP_FEEDLY_CLIENT_ID,
                      client_secret: process.env.REACT_APP_FEEDLY_CLIENT_SECRET,
                      redirect_uri: process.env.REACT_APP_APP_URL,
                      grant_type: "authorization_code"
                  }),
                  headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/json"
                  },
                  mode: 'cors'
              });
      const aTJ = await aT.json();
      dispatch({ type: AppActionEnum.SetAccessToken, payload: aTJ.access_token });
      dispatch({ type: AppActionEnum.SetRefreshToken, payload: aTJ.refresh_token });

    }else{
      console.log("NOT LOGGED IN");
    }
  };

    getAccessCode();
  }, [])

  return (
    <div className={` ${state.bgClass} min-h-screen `} >
      <div className=' xl:container md:container mx-auto py-10' >


        <h1 style={{ background: '-webkit-linear-gradient(#32a852, #a5e6b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className='text-7xl font-title text-center py-3' > Feedly Tab </h1>

        <div className='my-8' >

          { !state.loggedIn && <LoginComponent loading={state.loginLoading} /> }

          {
            state.loggedIn && <div>
                <DisplayArticle />
            </div>
          }

        </div>

      </div>
    </div>
  );
};

export default App;
