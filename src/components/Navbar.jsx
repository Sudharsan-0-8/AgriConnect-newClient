import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom'; 

import logo from '../assets/logo.png';
import avatar from '../assets/farmer_avatar.png';

import { show, hide } from "../features/sidebar"; 
import { logout } from "../features/login";
import { unSetUser } from "../features/user";


function Navbar({ className: classes }) {
    const { isLoggedIn } = useSelector((state)=>state.login);
    const { isSidebarVisible } = useSelector((state)=>state.sidebar);
    const { value: { username } } = useSelector((state)=>state.user);
    const dispatch = useDispatch();

    const { pathname } = useLocation();
    const navigate = useNavigate(); 

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(unSetUser());
        navigate('/');
        dispatch(hide());
    }

    const handleNavigate = (route) => {
        navigate(route);
        dispatch(hide());
    }

    return (
        <div className={`${classes} container mx-auto mt-7 pr-6`}>
            <div className={`${isSidebarVisible ? 'blur-sm' : ''} mx-auto flex flex-row justify-between lg:justify-between items-centerd`}>
                <div className="flex-[1] flex flex-row justify-start items-center space-x-10">
                    {/* <img src={logo} 
                        className="flex-shrink-0 h-10"
                        alt="" 
                    /> */}
                    <h1 className="text-4xl font-bold text-aggreen pl-6">AgriConnect</h1>
                    {   isLoggedIn ? (
                        <div className="hidden xl:flex justify-center items-center space-x-2">
                            <img src={avatar} alt="avatar"
                                className="h-10 w-10"
                            />
                            <h1 className="font-3xl text-slate-600"><p>{username}</p></h1>
                        </div>
                        ) : ''
                    }
                </div>
                
                <div className="flex flex-1 flex-shrink-0 lg:flex-[3.5] flex-row md:justify-center lg:justify-center xl:justify-end items-center space-x-6">
                    <nav className="lg:flex hidden flex-row justify-end space-x-6">
                        <a className={`text-lg text-black hover:font-bold cursor-pointer ${pathname==='/'? 'font-bold' : '' }`} onClick={()=>navigate('/')}>Home</a>
                        <a className={`text-lg text-black hover:font-bold cursor-pointer ${pathname==='/feeds'? 'font-bold' : '' }`} onClick={()=>navigate('/feeds')}>Feeds</a>
                        <a className={`text-lg text-black hover:font-bold cursor-pointer ${pathname==='/about'? 'font-bold' : '' }`} onClick={()=>navigate('/about')}>About</a>
                    </nav>
                    { !isLoggedIn ? (
                        <div className=" flex justify-between">       
                            <div className="xl:flex hidden flex-row border-2 border-slate-400 rounded-xl w-fit h-10">
                                <button className="px-10 font-bold text-aggreen cursor-pointer" onClick={()=>navigate('/login')}>
                                    login
                                </button>
                                <div className="px-10 text-white font-bold bg-aggreen rounded-xl text-center py-1.5 [cursor:pointer]" onClick={()=>navigate('/signup')}>
                                    signup
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className=" flex justify-between">       
                            <div className="xl:flex hidden flex-row border-2 border-slate-400 rounded-xl w-fit h-10">
                                <div className="px-10 text-white font-bold bg-aggreen rounded-xl text-center py-1.5 [cursor:pointer]" onClick={logoutHandler}>
                                    logout
                                </div>
                            </div>
                        </div>
                    ) }
                </div>
                <div className="md:flex flex-shrink flex flex-row xl:hidden justify-end">
                    <div className=" text-center py-4 space-y-2 [cursor:pointer]"
                            onClick={()=>{
                                dispatch(show());
                            }}
                    >
                        <div className="h-1 w-8 bg-aggreen"></div>
                        <div className="h-1 w-8 bg-aggreen"></div>
                        <div className="h-1 w-8 bg-aggreen"></div>
                    </div>
                </div>
            </div>

            {/* sidebar */}
            <div className={`${isSidebarVisible?'visible':'hidden'} fixed flex flex-col w-80 h-[100%] bg-white shadow-2xl shadow-black z-50 top-0 right-0 p-10 space-y-6`}>
                <div className="self-end [cursor:pointer]"
                    onClick={()=>{
                        dispatch(hide());  
                    }}
                >
                    <div className="absolute h-1 w-8 rotate-45 bg-aggreen"></div>
                    <div className="absolute h-1 w-8 -rotate-45 bg-aggreen"></div>
                </div>
                {   isLoggedIn ? (
                        <div className="flex flex-col justify-center items-center space-y-2">
                            <img src={avatar} alt="avatar"
                                className="h-10 w-10 overflow-clip"
                            />
                            <h1 className="font-3xl text-slate-600"><p>{username}</p></h1>
                        </div>
                    ) : <></>
                }
                <div className={`lg:hidden text-center py-4 hover:font-bold cursor-pointer ${pathname==='/'? 'font-bold' : '' }`} onClick={()=>handleNavigate('/')}>Home</div>
                <div className={`lg:hidden text-center py-4 hover:font-bold cursor-pointer ${pathname==='/feeds'? 'font-bold' : '' }`} onClick={()=>handleNavigate('/feeds')}>Feeds</div>
                <div className={`lg:hidden text-center py-4 hover:font-bold cursor-pointer ${pathname==='/about'? 'font-bold' : '' }`} onClick={()=>handleNavigate('/about')}>About</div>
                { !isLoggedIn ? (
                    <>
                        <div className="self-center py-4 text-center w-24 bg-aggreen rounded-3xl text-white font-bold cursor-pointer" onClick={()=>handleNavigate('/login')}>login</div>
                        <div className="self-center py-4 text-center w-24 bg-aggreen rounded-3xl text-white font-bold cursor-pointer" onClick={()=>handleNavigate('/signup')}>signup</div>
                    </>  
                ) : (
                    <>
                        <div className="self-center py-4 text-center w-24 bg-aggreen rounded-3xl text-white font-bold cursor-pointer" onClick={logoutHandler}>logout</div>
                    </>
                ) }

            </div>

        </div>
     );
}

export default Navbar;