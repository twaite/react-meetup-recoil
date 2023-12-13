import { Fragment } from "react";

export default function TeamsLoading() {
  return (
    <Fragment>
      <div className="grid grid-cols-4 gap-3 animate-pulse">
        <div className="h-6 bg-indigo-500 rounded col-span-4" />
        <div className="h-6 bg-indigo-500 rounded col-span-3" />
        <div className="h-6 bg-indigo-500 rounded col-span-4" />
      </div>
      <div className="text-xs font-semibold leading-6 text-indigo-200">
        Your teams
      </div>
      <div className="grid grid-cols-4 gap-3 animate-pulse">
        <div className="h-6 bg-indigo-500 rounded col-span-4" />
        <div className="h-6 bg-indigo-500 rounded col-span-3" />
        <div className="h-6 bg-indigo-500 rounded col-span-4" />
      </div>
    </Fragment>
  );
}
