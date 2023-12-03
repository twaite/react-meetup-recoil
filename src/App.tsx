import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "@pages/Home";
import Login from "@pages/Login";
import Learn from "@pages/Learn";
import Providers from "@app/providers/Providers";

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
