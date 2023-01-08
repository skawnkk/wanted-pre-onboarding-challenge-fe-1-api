import React from 'react';

function Login() {
  return (
    <div>
      <section>
        <div>로그인</div>
        <div>
          <form>
            <input type="email" placeholder="이메일 주소"></input>
            <input type="password" placeholder="비밀번호"></input>
            <button type="submit">확인</button>
          </form>
        </div>
      </section>
      <section>회원가입</section>
    </div>
  );
}

export default Login;
