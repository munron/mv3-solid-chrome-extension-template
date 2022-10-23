export const revokeAuthToken = (token: string) => {
  chrome.identity.removeCachedAuthToken({ token: token }, () => {});
  chrome.identity.clearAllCachedAuthTokens(() => {});
  const url = `https://accounts.google.com/o/oauth2/revoke?token=${token}`;
  fetch(url).then((response) => {});
};
