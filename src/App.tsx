import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "@components/Header";
import Login from "@pages/Login";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <AuthProvider>
          <QueryClientProvider client={client}>
            <Header />
            <div
              className="container mx-auto px-4 sm:px-6 lg:px-8
             max-w-7xl py-4"
            >
              <Outlet />
            </div>
          </QueryClientProvider>
        </AuthProvider>
      </QueryParamProvider>
    ),
    children: [
      {
        path: "/dashboard",
        children: [
          {
            path: "/dashboard/:id",
          },
          {
            path: "/dashboard/ticket/:id",
          },
        ],
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signout",
        element: <h1>Signout</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
