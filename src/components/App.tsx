import { Component, createSignal, Show } from "solid-js";
import { OcSignout2 } from "solid-icons/oc";
import logo from "@src/assets/logo.svg";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "@src/contexts/AuthProvider";

const App: Component<{ title?: string }> = (props) => {
  const { isAuthenticated, login, logout, user } = useAuth()!;
  return (
    <div
      class="flex flex-col items-center justify-center gap-[10px] 
             bg-slate-100 p-[10px] text-black"
    >
      <h1>{props.title ?? ""}</h1>
      <img src={chrome.runtime.getURL(logo)} alt="logo" />
      <Show
        when={isAuthenticated()}
        fallback={() => (
          <GoogleLoginButton
            handler={async () => await login({ interactive: true })}
          />
        )}
      >
        <img src={user()?.profileImage ?? ""} />
        <p>{user()?.nickName ?? ""} </p>
        <p>{user()?.email ?? ""} </p>
        <div
          class="flex flex-row items-center justify-center gap-1 rounded-md bg-slate-300 p-2"
          onClick={async () => await logout({ revokeToken: true })}
        >
          Logout <OcSignout2 />
        </div>
      </Show>
    </div>
  );
};

export default App;
