const ACCESS_TOKEN_KEY = "access_token";

export const getTokens = (): string | any => {
  try {
    const data : any= localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!data) {
      return null;
    }
    return {headers: {
      Authorization: `Bearer ${data}`
    }};
  } catch (err) {
    console.error(err);
    return null;
  }
}