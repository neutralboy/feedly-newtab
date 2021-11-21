import React from "react";

const LoginComponent = ( ) => {

    return (

        <div className="bg-gray-800 rounded-md shadow-lg w-1/3 mx-auto p-6 px-8" >
            <p className="text-gray-200" > 
              Authorize Feedly Tab to access your <span className="text-feedly" >Feedly</span> account
            </p>
            <div className="mt-3" >
              <a href={`${process.env.REACT_APP_FEEDLY_ROOT}/v3/auth/auth?response_type=code&client_id=${process.env.REACT_APP_FEEDLY_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_APP_URL}&scope=https://cloud.feedly.com/subscriptions`} className=" py-2 px-4 shadow-md rounded-md bg-feedly text-white font-display block text-2xl my-auto mx-auto" >
                <span className="mr-4" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" className="inline fill-current"><path fill="currentColor" d="M16.034 3.334a2.867 2.867 0 00-4.043 0L1.834 13.49a2.867 2.867 0 000 4.043l7.248 7.248c.504.44 1.164.706 1.886.706h6.089c.793 0 1.512-.322 2.032-.841l7.107-7.108a2.867 2.867 0 000-4.043L16.034 3.334zm-.283 18.551L14.736 22.9a.407.407 0 01-.29.12h-.868a.41.41 0 01-.27-.1l-1.033-1.034a.408.408 0 010-.577l1.449-1.45a.41.41 0 01.577 0l1.45 1.45a.409.409 0 010 .577zm0-6.079l-4.054 4.054a.408.408 0 01-.29.12h-.869a.408.408 0 01-.269-.1l-1.034-1.035a.41.41 0 010-.577l4.489-4.488a.409.409 0 01.577 0l1.45 1.45a.409.409 0 010 .576zm0-6.08L8.657 16.82a.408.408 0 01-.29.12H7.5a.407.407 0 01-.27-.1l-1.034-1.035a.409.409 0 010-.577L13.724 7.7a.409.409 0 01.577 0l1.45 1.45a.409.409 0 010 .576z"></path></svg>
                </span>
                Login to Feedly
              </a>
            </div>
        </div>

    );
};

export default LoginComponent;
