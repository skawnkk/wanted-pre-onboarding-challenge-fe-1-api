const emailValidate = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/g;
  return Boolean(email.match(regex));
};

const passwordValidate = (password: string) => {
  return password.length >= 8;
};

export { emailValidate, passwordValidate };
