/* @refresh reload */
import { render } from "solid-js/web";

import "@src/style/index.css";
import App from "@src/components/App";
import { AuthProvider } from "@src/contexts/AuthProvider";

render(
  () => (
    <AuthProvider>
      <App title="Popup" />
    </AuthProvider>
  ),
  document.getElementById("root") as HTMLElement
);
