import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { faker } from "@faker-js/faker";
import { fakePromise } from "@app/promises";
import { useQuery } from "react-query";
import { AuthContext } from "./AuthProvider";

interface TeamData {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

interface Team extends TeamData {
  current: boolean;
  initial: string;
  select: () => void;
}

type TeamContextType = {
  teams: Team[];
  loading: boolean;
};

export const TeamContext = createContext<TeamContextType>({
  teams: [],
  loading: false,
});

type Props = {
  children: ReactNode;
};

export default function TeamProvider(props: Props) {
  /** Context */
  const { user } = useContext(AuthContext);

  /** Data */
  const { data, isLoading } = useQuery({
    queryKey: ["teams", user?.id],
    queryFn: () => fetchTeams(user!.id),
    enabled: Boolean(user?.id),
  });

  /** State */
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  /** Memos */
  const teams = useMemo(() => {
    return (
      data?.map((t) => ({
        ...t,
        current: t.id === selectedTeamId,
        initial: t.name[0],
        select: () => setSelectedTeamId(t.id),
      })) ?? []
    );
  }, [data, selectedTeamId]);

  /** Effects */
  useEffect(() => {
    if (!selectedTeamId && teams.length > 0) {
      setSelectedTeamId(teams[0].id);
    }
  }, [selectedTeamId, teams]);

  /** Render */
  return (
    <TeamContext.Provider
      value={{
        teams,
        loading: isLoading,
      }}
    >
      {props.children}
    </TeamContext.Provider>
  );
}

async function fetchTeams(userId: string) {
  faker.seed(parseInt(userId.replace(/![0-9]/g, "")));
  return fakePromise<TeamData[]>(
    faker.helpers.multiple(
      () => ({
        id: faker.string.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        name: faker.company.name(),
      }),
      { count: { min: 1, max: 5 } }
    )
  );
}
