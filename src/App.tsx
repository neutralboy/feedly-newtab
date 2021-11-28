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


        {
          !state.loggedIn && <h1 style={{ background: '-webkit-linear-gradient(#32a852, #a5e6b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className='text-7xl font-title text-center py-3' > Feedly Tab </h1>
        }


        <div className='my-8' >

          { !state.loggedIn && <LoginComponent loading={state.loginLoading} /> }

          {
            state.loggedIn && <div>
                <DisplayArticle />
            </div>
          }

        </div>

      </div>




      {
          state.loggedIn &&
          <div className={` ${state.bgClass1} flex shadow-md bottom-0 justify-between z-50 w-full py-4 sticky border-t-2 px-4 `} >
            <div>
                <h2 className="font-title text-feedly text-3xl" >
                  Feedly Tab
                </h2>
            </div>
            <div className="flex justify-evenly" >
              <div className='my-auto' >
                  <a className="text-white hover:text-gray-200" href="https://github.com/neutralboy/feedly-tab" >
                    <svg className="fill-current inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path>
                    </svg>
                  </a>
              </div>
            </div>
          </div>
        }

    </div>
  );
};

export default App;
