import { ReactNode, createContext } from "react";

type List = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

const DashboardContext = createContext({
  lists: [] as List[],
});

type Props = {
  children: ReactNode;
};

export default function DashboardProvider(props: Props) {
  return (
    <DashboardContext.Provider
      value={{
        lists: [],
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}
