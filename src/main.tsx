import "./assets/styles/app-base.css";
import "./assets/styles/app-components.css";
import "./assets/styles/app-utilities.css";
import { QueryClient, QueryClientProvider } from "react-query";

import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const root = document.getElementById("root");
ReactDOM.createRoot(root!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
