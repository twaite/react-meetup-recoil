import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import AuthProvider from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/Header";
import { Outlet } from "react-router";

const client = new QueryClient();

export default function Layout() {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthProvider>
        <QueryClientProvider client={client}>
          <Header />
          <Outlet />
        </QueryClientProvider>
      </AuthProvider>
    </QueryParamProvider>
  );
}
