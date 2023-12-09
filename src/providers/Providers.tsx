import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import AuthProvider from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router";
import Layout from "@components/Layout";
import KeyboardShortcutsProvider from "./KeyboardShortcutsProvider";

const client = new QueryClient();

export default function Providers() {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthProvider>
        <QueryClientProvider client={client}>
          <KeyboardShortcutsProvider>
            <Layout>
              <Outlet />
            </Layout>
          </KeyboardShortcutsProvider>
        </QueryClientProvider>
      </AuthProvider>
    </QueryParamProvider>
  );
}
