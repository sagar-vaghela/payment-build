const ACCESS_TOKEN_KEY = "access_token";

export const getTokens = () => {
  try {
    const data : any= localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!data) {
      return;
    }
    return {headers: {
      Authorization: `Bearer ${data}`
    }};
  } catch (err) {
    console.error(err);
    return;
  }
}