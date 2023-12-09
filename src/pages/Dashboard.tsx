import { AuthContext } from "@app/providers/AuthProvider";
import { useContext } from "react";
import { Outlet, redirect } from "react-router";

export default function DashboardPage() {
  /** Custom Hooks */
  const { isSignedIn } = useContext(AuthContext);

  /** Effects */
  if (!isSignedIn) {
    redirect("/login");
  }

  /** Render */
  return <Outlet />;
}
