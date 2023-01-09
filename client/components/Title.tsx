import React from 'react';
import { useRouter } from 'next/router';

function Title() {
  const router = useRouter();
  const handleClickLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth');
  };

  return (
    <div className={'flex h-[80px] justify-between'}>
      <h1 className={`text-slate-900 font-extrabold text-4xl`}>TodoChallenge</h1>
      <button className={'mr-2'} onClick={handleClickLogout}>
        logout
      </button>
    </div>
  );
}

export default Title;
