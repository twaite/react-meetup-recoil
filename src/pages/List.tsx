import { getList } from "@app/api";
import { FlagIcon } from "@heroicons/react/20/solid";
import { groupBy, sortBy, startCase } from "lodash-es";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

export default function List() {
  /* Custom */
  const { listId } = useParams();

  /* Data */
  const { data: list, isLoading } = useQuery({
    queryKey: ["list", listId],
    queryFn: () => getList(listId!),
    enabled: !!listId,
  });

  /* Memo */
  const groupedData = useMemo(groupedDataMemo, [list]);

  /* Render */
  return (
    <>
      {isLoading ? (
        <>
          <h1 className="text-2xl font-bold pb-3">Loading...</h1>
          <div className="grid grid-cols-6 gap-3 animate-pulse mt-8">
            <div className="h-8 rounded bg-gray-100 col-span-1" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
            <div className="h-8 mt-8 rounded bg-gray-100 col-span-1" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
            <div className="h-8 mt-8 rounded bg-gray-100 col-span-1" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
            <div className="h-6 rounded bg-gray-100 col-span-6" />
          </div>
        </>
      ) : list ? (
        <>
          <h1 className="text-2xl font-bold pb-3">{startCase(list.name)}</h1>
          {sortBy(
            Object.entries(groupedData.tasks),
            ([_, tasks]) => tasks[0].status.order
          ).map(([status, tasks]) => (
            <div key={status}>
              <div className="flex">
                <h2
                  style={{ background: tasks[0].status.color }}
                  className="font-bold text-lg rounded px-3 py-1 text-white mt-8"
                >
                  {status}
                </h2>
              </div>
              <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            CreatedAt
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Due Date
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Assignee
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Priority
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {tasks.map((task) => (
                          <tr
                            key={task.id}
                            className="even:bg-gray-50 hover:bg-gray-100 cursor-pointer"
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                              {task.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {formatDate(task.createdAt)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {formatDate(task.dueAt)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <img
                                  className="inline-block h-6 w-6 rounded-full overflow-hidden bg-gray-100 mr-2"
                                  src={task.assignedTo.avatar}
                                />
                                {task.assignedTo.name}
                              </span>
                            </td>
                            <td
                              className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                              style={{ color: task.priority.color }}
                            >
                              <span className="flex items-center">
                                <FlagIcon
                                  height={16}
                                  className="mr-2"
                                  style={{ fill: task.priority.color }}
                                />
                                {task.priority.name}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h1>Error loading list</h1>
      )}
    </>
  );

  /* Memo Defs */
  function groupedDataMemo() {
    return {
      ...list,
      tasks: groupBy(list?.tasks, "status.name"),
    };
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
}
