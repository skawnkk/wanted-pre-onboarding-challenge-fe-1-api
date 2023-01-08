const isLogin = () => {
  return Boolean(localStorage.getItem('token')) || false;
};

export { isLogin };
