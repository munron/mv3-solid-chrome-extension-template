import { ChromeRuntimeMessage } from "@src/types/extension";

export const getAuthToken = (interactive: boolean) => {
  return new Promise<string>((resolve) => {
    const msg = {
      type: ChromeRuntimeMessage.ISSUE_AUTH_TOKEN,
      interactive: interactive,
    };
    chrome.runtime.sendMessage(msg, (response) => {
      resolve(response.token);
    });
  });
};
