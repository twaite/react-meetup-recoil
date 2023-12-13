import { useTeams } from "@app/recoil/team";
import { Fragment } from "react";
import Items from "./Items";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Team() {
  /** Custom */
  const { selectedTeam, teams } = useTeams();

  return (
    <Fragment>
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          <Items items={selectedTeam?.items ?? []} />
        </ul>
      </li>
      <li>
        <div className="text-xs font-semibold leading-6 text-indigo-200">
          Your teams
        </div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {teams?.map((team) => (
            <li key={team.id}>
              <a
                onClick={team.select}
                className={classNames(
                  team.current
                    ? "bg-indigo-700 text-white"
                    : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                )}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                  {team.initial}
                </span>
                <span className="truncate">{team.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </li>
    </Fragment>
  );
}
