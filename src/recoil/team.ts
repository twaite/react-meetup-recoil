import { fetchTeams } from "@app/api";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "./user";
import { startTransition, useEffect, useMemo } from "react";

const selectedTeamIdAtom = atom<string | null>({
  key: "selectedTeamId",
  default: localStorage.getItem("selectedTeamId") ?? null,
});

const teamsAtom = selector({
  key: "teams",
  get: async ({ get }) => {
    const userId = get(userAtom)?.id;

    if (userId) {
      return fetchTeams(userId);
    }

    return [];
  },
});

const selectedTeamAtom = selector({
  key: "selectedTeam",
  get: ({ get }) => {
    const teams = get(teamsAtom);
    const selectedTeamId = get(selectedTeamIdAtom);

    return teams.find((team) => team.id === selectedTeamId) ?? null;
  },
});

export function useTeams() {
  /** State */
  const [selectedTeamId, setSelectedTeamId] =
    useRecoilState(selectedTeamIdAtom);
  const data = useRecoilValue(teamsAtom);
  const selectedTeam = useRecoilValue(selectedTeamAtom);

  /** Effects */
  useEffect(defaultToFirstTeam, [data, selectedTeamId, setSelectedTeamId]);

  /** Memo */
  const teams = useMemo(
    () =>
      data?.map((team) => ({
        ...team,
        initial: team.name[0],
        current: team.id === selectedTeamId,
        select: () =>
          startTransition(() => {
            localStorage.setItem("selectedTeamId", team.id);
            setSelectedTeamId(team.id);
          }),
      })),
    [data, setSelectedTeamId, selectedTeamId]
  );

  return {
    teams,
    selectedTeam,
    setSelectedTeamId,
  };

  function defaultToFirstTeam() {
    if (!selectedTeamId && data?.length) {
      setSelectedTeamId(data?.[0]?.id ?? null);
    }
  }
}
