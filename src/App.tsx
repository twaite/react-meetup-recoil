import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Providers from "@app/providers/Providers";
import Dashboard from "@pages/Dashboard";
import Document from "@pages/Document";
import Home from "@pages/Home";
import Learn from "@pages/Learn";
import Login from "@pages/Login";
import List from "@pages/List";

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
        Component: Dashboard,
        children: [
          {
            path: "/dashboard/list/:listId",
            Component: List,
          },
          {
            path: "/dashboard/document/:docId",
            Component: Document,
          },
          {
            path: "/dashboard/list/:listId/task/:taskId",
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
