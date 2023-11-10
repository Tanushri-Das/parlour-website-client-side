import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./Contexts/AuthProvider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routes from "./Routes/Routes/Routes.jsx";

const queryClient = new QueryClient({
  defaultQueryOptions: {
    // Use 'defaultQueryOptions' instead of 'defaultOptions'
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div>
          <RouterProvider router={routes} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
