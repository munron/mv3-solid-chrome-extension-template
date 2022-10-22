/* @refresh reload */
import { render } from "solid-js/web";

import "@src/style/index.css";
import App from "@src/components/App";

render(
  () => <App title="Popup" />,
  document.getElementById("root") as HTMLElement
);
