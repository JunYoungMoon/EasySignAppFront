export const oauth2Login = async (kakao:string) => {
  console.log(kakao);
  clearToken();

  await userManager.signinRedirect();
};

export const oauth2Logout = async () => {
  await userManager.signoutRedirect();
};

export const refreshToken = async (loginPath: string) => {
  const user = await userManager.signinRedirectCallback();
  if (user) {
    localStorage.setItem("access_token", user.access_token);
    localStorage.setItem("refresh_token", user.refresh_token || "");
  } else {
    clearToken();
  }
};

export const clearToken = () => {
  const redirect = localStorage.getItem("redirect");
  localStorage.clear();
  if (redirect) {
    localStorage.setItem("redirect", redirect);
  }
  sessionStorage.clear();
};

