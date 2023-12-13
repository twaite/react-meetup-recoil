import { ReactNode } from "react";
import MarketingHeader from "./MarketingHeader";
import AuthedLayout from "./AuthedLayout";
import { useUser } from "@app/recoil/user";

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  const { isSignedIn } = useUser();

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
