import React, {useContext, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';

import { AppActionEnum, AppContext} from './store/Context';
import LoginComponent from './components/LoginComponent';
import { useQuery } from './store/utils';


const App = () => {
  const { state, dispatch } = useContext(AppContext);
  const query = useQuery();
  let history = useNavigate();

  // Get access code and login
  const getAccessCode = () => {
    if(query.get("code")){
      dispatch({ type: AppActionEnum.SetAccessToken, payload: query.get("code")?.toString() });
      history("/");
    }else{
      console.log("NOT LOGGED IN");
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(()=>{
    getAccessCode();
  }, [])

  return (
    <div className={` ${state.bgClass} min-h-screen `} >
      <div className=' xl:container md:container mx-auto py-10' >


        <h1 style={{ background: '-webkit-linear-gradient(#32a852, #a5e6b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className='text-7xl font-title text-center py-3' > Feedly Tab </h1>

        <div className='my-8' >

          { !state.loggedIn && <LoginComponent /> }

          CODE: {query.get("code")}
        </div>

      </div>
    </div>
  );
};

export default App;
