import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router";
import Layout from "@components/Layout";
import KeyboardShortcutsProvider from "./KeyboardShortcutsProvider";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

const client = new QueryClient();

export default function Providers() {
  return (
    <RecoilRoot>
      <Suspense fallback={<h1>Loading...</h1>}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <QueryClientProvider client={client}>
            <KeyboardShortcutsProvider>
              <Layout>
                <Outlet />
              </Layout>
            </KeyboardShortcutsProvider>
          </QueryClientProvider>
        </QueryParamProvider>
      </Suspense>
    </RecoilRoot>
  );
}
