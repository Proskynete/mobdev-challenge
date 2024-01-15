import "./assets/styles/app-base.css";
import "./assets/styles/app-components.css";
import "./assets/styles/app-utilities.css";

import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";

const root = document.getElementById("root");
ReactDOM.createRoot(root!).render(<App />);
