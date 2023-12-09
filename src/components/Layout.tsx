import { AuthContext } from "@app/providers/AuthProvider";
import { ReactNode, useContext } from "react";
import MarketingHeader from "./MarketingHeader";
import AuthedLayout from "./AuthedLayout";

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  const { isSignedIn } = useContext(AuthContext);

  if (isSignedIn) {
    return <AuthedLayout>{props.children}</AuthedLayout>;
  } else {
    return (
      <div>
        <MarketingHeader />
        {props.children}
      </div>
    );
  }
}
