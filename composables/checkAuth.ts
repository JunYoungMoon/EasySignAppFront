export const checkAuth = async (tokenType, csrfToken) => {

  let token;
  if (tokenType === 'accessToken') {
    token = localStorage.getItem('accessToken');
  } else if (tokenType === 'refreshToken') {
    token = localStorage.getItem("refresh_token");
    localStorage.getItem("refresh_token");
  } else {
    console.error('Invalid tokenType:', tokenType);
    return;
  }

  try {
    const res = await $fetch("/check-auth", {
      method: "POST",
      baseURL: "http://localhost:8080",
      credentials: "include",
      data : {
        token,
        csrfToken,
      }
    });

    if (tokenType === 'accessToken' && res === 'Refresh token required') {
      await checkAuth('refreshToken', csrfToken);
      return false;
    }

    return {res};

  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};
