import { Component } from "solid-js";

import App from "@src/components/App";
import { AuthProvider } from "@src/contexts/AuthProvider";

const Contents: Component = () => {
  return (
    <div class="fixed right-[10px] top-[10px] z-[2000] w-[200px] rounded-2xl bg-white">
      <AuthProvider>
        <App title="Contents" />
      </AuthProvider>
    </div>
  );
};

export default Contents;
