//export {};
import { ChromeRuntimeMessage } from "@src/types/extension";
import { revokeAuthToken } from "@src/utils/revokeAuthToken";

// install or update event
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    // install
  } else if (details.reason == "update") {
    // update
  }
});

const sendAuthToken = (
  interactive: boolean,
  sender: any,
  sendResponse: any
) => {
  chrome.identity.getAuthToken({ interactive: interactive }, (token) => {
    console.log(`token = ${token}`);
    sendResponse({ token: token });
  });
};

// Contents側からの受信イベント
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // token発行
  if (request.type == ChromeRuntimeMessage.ISSUE_AUTH_TOKEN) {
    sendAuthToken(request.interactive, sender, sendResponse);
    return true;
  }
  // token失効
  if (request.type == ChromeRuntimeMessage.REVOKE_AUTH_TOKEN) {
    revokeAuthToken(request.token);
    return true;
  }
  sendResponse();
  return;
});
