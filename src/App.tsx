import React, {useContext}  from 'react';

import { AppContext, AppActionEnum } from './store/Context';

const App = () => {
  const { state, dispatch } = useContext(AppContext);

  const incr = () => {
    dispatch({ type: AppActionEnum.Increment, payload: 2 });
  };

  return (
    <div className={` ${state.bgClass} min-h-screen `} >
      <div className=' xl:container md:container mx-auto py-12' >


        <h1 style={{ background: '-webkit-linear-gradient(#32a852, #a5e6b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className='text-7xl font-title text-center py-3' > Feedly Tab </h1>


        <div className='h-10 bg-white' >
          State: { state.num }
          <button onClick={incr} className='p-3 text-white bg-red-700' > Increment </button>
        </div>


      </div>
    </div>
  );
};

export default App;
