import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <AuthProvider>
          <QueryClientProvider client={client}>
            <h1>App</h1>
            <Link to="/login">Sign In</Link>
            <Outlet />
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
        element: <h1>Login</h1>,
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
