import { Component, createSignal } from "solid-js";

import logo from "@src/assets/logo.svg";

const App: Component<{ title?: string }> = (props) => {
  const [count, setCount] = createSignal(0);
  setInterval(() => setCount(count() + 1), 1000);
  return (
    <div
      class="flex flex-col items-center justify-center gap-[10px] 
             bg-slate-100 p-[10px] text-black"
    >
      <h1>{props.title ?? ""}</h1>
      <img src={chrome.runtime.getURL(logo)} alt="logo" />
      <p>
        Edit <code>src/components/App.tsx</code> and save to reload.
      </p>
      <p>Counter: {count}</p>
    </div>
  );
};

export default App;
