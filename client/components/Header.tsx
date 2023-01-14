import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {deleteCookie} from "cookies-next";
import {isLogin, TOKEN_KEY} from "../utils/auth";

function Header() {
  const router = useRouter();
  const [isUserLogin, setIsUserLogin] = useState(false)
  const handleClickLogout = () => {
    deleteCookie(TOKEN_KEY)
    router.push('/auth')
  };

  useEffect(()=>{
    setIsUserLogin(isLogin())
  },[isLogin()])

  return (
    <div className={'flex h-[80px] justify-between'}>
      <p className={`text-slate-900 font-extrabold text-4xl`}>TodoChallenge</p>
      {isUserLogin && <button className={'p-2 h-min border border-slate-600'} onClick={handleClickLogout}>logout</button>}
    </div>
  );
}

export default Header;
