import React, {useContext, useEffect}  from 'react';

import { AppContext} from './store/Context';
import LoginComponent from './components/LoginComponent';

const App = () => {
  const { state } = useContext(AppContext);


  useEffect(() => {
    console.log(state);
  }, [state])

  return (
    <div className={` ${state.bgClass} min-h-screen `} >
      <div className=' xl:container md:container mx-auto py-10' >


        <h1 style={{ background: '-webkit-linear-gradient(#32a852, #a5e6b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className='text-7xl font-title text-center py-3' > Feedly Tab </h1>

        <div className='my-8' >

          { !state.loggedIn && <LoginComponent /> }

        </div>

      </div>
    </div>
  );
};

export default App;
