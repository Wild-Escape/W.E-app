const JWT_TOKEN_KEY = "accessToken";

let _accessToken = localStorage.getItem(JWT_TOKEN_KEY) || "";

export const setAccessToken = (token) => {
    
  localStorage.setItem(JWT_TOKEN_KEY, token.accessToken);
  _accessToken = token.accessToken;
};

export const getAccessToken = () => {

  return _accessToken;
};

export const logout = () => {
  localStorage.removeItem(JWT_TOKEN_KEY);

  window.location.assign("/common/login");
};