import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Providers from "@app/providers/Providers";
import DashboardPage from "@pages/Dashboard";
import Home from "@pages/Home";
import Learn from "@pages/Learn";
import Login from "@pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Providers,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/learn",
        Component: Learn,
      },
      {
        path: "/dashboard",
        children: [
          {
            Component: DashboardPage,
            path: "/dashboard/:itemId",
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
