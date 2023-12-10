import { ReactNode, createContext, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "./AuthProvider";
import { useLocalStorage } from "@uidotdev/usehooks";
import { first } from "lodash-es";
import { Team as TeamData, fetchTeams } from "@app/api";

interface Team extends TeamData {
  current: boolean;
  initial: string;
  select: () => void;
}

type TeamContextType = {
  selectedTeam: Team | null;
  teams: Team[];
  loading: boolean;
};

export const TeamContext = createContext<TeamContextType>({
  selectedTeam: null,
  teams: [],
  loading: false,
});

type Props = {
  children: ReactNode;
};

export default function TeamProvider(props: Props) {
  /** Context */
  const { user } = useContext(AuthContext);

  /** State */
  const [selectedTeamId, setSelectedTeamId] = useLocalStorage<string | null>(
    "selectedTeamId",
    null
  );

  /** Data */
  const { data, isLoading } = useQuery({
    queryKey: ["teams", user?.id],
    queryFn: () => fetchTeams(user!.id),
    enabled: Boolean(user?.id),
    onSuccess: (data) => {
      if (!selectedTeamId) {
        setSelectedTeamId(first(data)?.id ?? null);
      }
    },
  });

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
  }, [data, selectedTeamId, setSelectedTeamId]);

  const selectedTeam = useMemo(
    () => teams?.find((t) => t.current) ?? null,
    [teams]
  );

  /** Render */
  return (
    <TeamContext.Provider
      value={{
        selectedTeam,
        teams,
        loading: isLoading,
      }}
    >
      {props.children}
    </TeamContext.Provider>
  );
}
