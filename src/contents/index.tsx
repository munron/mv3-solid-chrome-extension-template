import { render } from "solid-js/web";

import Contents from "./Contents";
import "@src/style/index.css";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

render(() => <Contents />, root);
