import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import "./global.scss";
import AuthContext from "./context/AuthContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer autoClose={3000} />
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <Router>
          <App />
        </Router>
      </AuthContext>
    </QueryClientProvider>
  </>
);
