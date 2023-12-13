import { useUser } from "@app/recoil/user";
import { Outlet, redirect } from "react-router";

export default function DashboardPage() {
  /** Custom Hooks */
  const { isSignedIn } = useUser();

  /** Effects */
  if (!isSignedIn) {
    redirect("/login");
  }

  /** Render */
  return <Outlet />;
}
