import React, {useContext} from "react";

import { AppContext, AppActionEnum } from "../store/Context";


const LoginComponent = ( ) => {

    const { dispatch } = useContext(AppContext);

    const login = () => {
        dispatch({ type: AppActionEnum.Login });
    };

    return (
        <div className="flex justify-center" >
            <div className="w-1/3 p-6 px-8 rounded-md bg-gray-800" >
                <div className="flex flex-col space-y-4" >


                    <div className="mt-4" >
                        <h2 className="text-3xl text-gray-200 font-display" > Login with Feedly </h2>
                    </div>
                    <div className="space-y-2" >
                        <label className="text-gray-300" > Email </label>
                        <input id="password" name="email" type="email" autoComplete="enail" required={true} placeholder="Your Email" className="
                        block
                        w-full
                        px-5
                        py-3
                        text-base text-neutral-600
                        placeholder-gray-300
                        transition
                        duration-500
                        ease-in-out
                        transform
                        border border-transparent
                        rounded-lg
                        bg-gray-50
                        focus:outline-none
                        focus:border-transparent
                        focus:ring-2
                        focus:ring-white
                        focus:ring-offset-2
                        focus:ring-offset-gray-300
                      " />
                    </div>
                    <div className="space-y-2" >
                        <label className="text-gray-300" > Password </label>
                        <input id="password" name="password" type="password" autoComplete="current-password" required={true} placeholder="Your Password" className="
                        block
                        w-full
                        px-5
                        py-3
                        text-base text-neutral-600
                        placeholder-gray-300
                        transition
                        duration-500
                        ease-in-out
                        transform
                        border border-transparent
                        rounded-lg
                        bg-gray-50
                        focus:outline-none
                        focus:border-transparent
                        focus:ring-2
                        focus:ring-white
                        focus:ring-offset-2
                        focus:ring-offset-gray-300
                      " />
                    </div>
                    <div>
                        <button onClick={login} className="rounded-md bg-feedly px-4 py-2 w-full text-white hover:bg-green-600" >
                            Login
                        </button>
                    </div>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-400"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 text-neutral-600 bg-gray-800 text-white"> OR</span>
                      </div>
                    </div>

                    {/* GOOGLE LOGIN */}
                    <div>
                        <button className="rounded-md bg-blue-800 border-2 border-black p-4 w-full text-gray-100 hover:bg-blue-900" >
                        <svg className="inline fill-current mr-4" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.956 10.356V13.807H16.748C16.302 16 14.435 17.26 11.956 17.26C9.06851 17.2202 6.74862 14.8682 6.74862 11.9805C6.74862 9.09275 9.06851 6.74072 11.956 6.70098C13.1562 6.69954 14.3194 7.11605 15.246 7.87898L17.846 5.27898C14.8636 2.65705 10.508 2.31981 7.15752 4.45142C3.80707 6.58303 2.26698 10.6712 3.37821 14.4836C4.48943 18.296 7.98491 20.9164 11.956 20.914C16.423 20.914 20.485 17.665 20.485 11.98C20.4781 11.4326 20.411 10.8877 20.285 10.355L11.956 10.356Z"></path>
                        </svg>
                            Login with Google
                        </button>
                    </div>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-400"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 text-neutral-600 bg-gray-800 text-white"> OR</span>
                      </div>
                    </div>


                    {/* APPLE LOGIN */}
                    <div>
                        <button className="rounded-md bg-black border-2 border-gray-500 p-4 w-full text-gray-100 hover:bg-gray-800" >
                        <svg className="inline fill-current mr-4" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.0941 21.006C8.46533 20.9719 7.87364 20.6977 7.4411 20.24C6.9237 19.7422 6.46199 19.1897 6.0641 18.592C5.44259 17.702 4.95131 16.7279 4.6051 15.699C4.21297 14.5922 4.00652 13.4282 3.9941 12.254C3.96397 11.1019 4.24961 9.96346 4.8201 8.96202C5.23768 8.24012 5.83329 7.63728 6.5501 7.21102C7.25899 6.78659 8.06792 6.55813 8.8941 6.54902C9.51692 6.58587 10.129 6.72823 10.7041 6.97002C11.1627 7.17178 11.6453 7.31362 12.1401 7.39202C12.6861 7.27763 13.2197 7.11017 13.7331 6.89202C14.3408 6.65474 14.9842 6.52187 15.6361 6.49902C15.7231 6.49902 15.8091 6.49902 15.8921 6.50902C17.3216 6.55048 18.6512 7.25221 19.4921 8.40902C18.1551 9.12387 17.3341 10.5303 17.3691 12.046C17.3559 13.1956 17.8352 14.2959 18.6861 15.069C19.069 15.4339 19.5149 15.7262 20.0021 15.932C19.9021 16.232 19.7871 16.522 19.6651 16.814C19.3878 17.4593 19.0457 18.0748 18.6441 18.651C18.265 19.2282 17.8237 19.7621 17.3281 20.243C16.8757 20.6919 16.2727 20.9567 15.6361 20.986C15.0965 20.9621 14.5663 20.8355 14.0741 20.613C13.5433 20.3818 12.9729 20.2551 12.3941 20.24C11.799 20.2517 11.2117 20.3777 10.6641 20.611C10.1911 20.8244 9.68585 20.9572 9.1691 21.004L9.0941 21.006ZM12.2441 6.49902C12.1691 6.49902 12.0941 6.49902 12.0191 6.49002C12.0033 6.37099 11.995 6.25109 11.9941 6.13102C12.0268 5.13216 12.4172 4.17826 13.0941 3.44302C13.4724 3.0206 13.931 2.67762 14.4431 2.43402C14.921 2.18802 15.4432 2.04012 15.9791 1.99902C15.9941 2.13002 15.9941 2.25802 15.9941 2.38002C15.98 3.36317 15.6106 4.308 14.9541 5.04002C14.3106 5.9028 13.3186 6.43689 12.2441 6.49902Z"></path>
                        </svg>
                            Login with Apple
                        </button>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default LoginComponent;
