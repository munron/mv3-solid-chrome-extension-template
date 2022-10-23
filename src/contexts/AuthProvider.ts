import { createSignal } from "solid-js";
import { createContextProvider } from "@solid-primitives/context";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuthToken } from "@src/utils/getAuthToken";
import { ChromeRuntimeMessage } from "@src/types/extension";
import { firebaseConfig } from "@src/plugins/firebaseConfig";

export interface IUser {
  nickName?: string;
  profileImage?: string;
  userId?: string;
  email?: string;
  isVIP?: boolean;
}

export const [AuthProvider, useAuth] = createContextProvider(() => {
  const app = initializeApp(firebaseConfig);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [token, setToken] = createSignal("");
  const [auth, setAuth] = createSignal(getAuth());
  const [user, setUser] = createSignal<IUser | null>(null);

  async function login({ interactive }: { interactive: boolean }) {
    const token = await getAuthToken(interactive);
    if (token) {
      setToken(token);
      startAuthEventhandler(auth());
      try {
        const oAuthCredential = GoogleAuthProvider.credential(null, token);
        const userCredential = await signInWithCredential(
          auth(),
          oAuthCredential
        );
      } catch (ex) {
        await logout({ revokeToken: true });
      }
    } else {
      await logout({ revokeToken: true });
    }
  }

  // ログインを検知してユーザー情報を更新する
  const startAuthEventhandler = (auth: Auth) => {
    console.log("startAuthEventhandler");
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Status: signin");
        setIsAuthenticated(true);
        setUser({
          nickName: user.displayName ?? "Anonymous",
          userId: user.uid ?? "",
          profileImage:
            user.photoURL ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbADKB5OER8mK9MCrkCBFJeXc2pZCGucLNxA&usqp=CAU",
          email: user.email ?? "",
          isVIP: false,
        });
      } else {
        console.log("Status: signout");
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  };

  async function logout({ revokeToken }: { revokeToken: boolean }) {
    const msg = {
      type: ChromeRuntimeMessage.REVOKE_AUTH_TOKEN,
      token: token(),
    };
    revokeToken &&
      chrome.runtime.sendMessage(msg, (response) => {
        console.log(response);
      });
    setToken("");
    await auth().signOut();
  }

  return { isAuthenticated, user, login, logout };
});
