export const writeUserData = ({ accessToken, refreshToken, user }) => {
  const timestemp = new Date().getTime() + 20 * 60 * 1000;
  const tokenEndDate = new Date(timestemp);

  localStorage.setItem('token', JSON.stringify(accessToken));
  localStorage.setItem('tokenEndDate', tokenEndDate);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
};
