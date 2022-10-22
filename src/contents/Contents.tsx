import { Component } from "solid-js";

import App from "@src/components/App";

const Contents: Component = () => {
  return (
    <div class="fixed right-[10px] top-[350px] z-[2000] w-[200px] rounded-2xl bg-white">
      <App title="Contents" />
    </div>
  );
};

export default Contents;
