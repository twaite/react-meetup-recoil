import { ItemType, ItemVariant, sortItems } from "@app/api";
import { ElementType, Fragment, useMemo, useState } from "react";
import {
  DocumentIcon,
  FolderIcon,
  FolderOpenIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";

type Props = {
  items: ItemType[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Items(props: Props) {
  /** Custom hooks */
  const { listId, docId } = useParams();
  const itemId = listId ?? docId;

  /** State */
  const [folderState, setFolderState] = useState<Record<string, boolean>>({});

  const sortedItems = useMemo(
    () => [...props.items].sort(sortItems),
    [props.items]
  );

  /** Render */
  return sortedItems.map((item) => {
    const Icon = getComponentForItem(item.type, folderState[item.id]);
    return (
      <Fragment key={item.id}>
        <li>
          <Link
            to={`/dashboard/${item.type.toLowerCase()}/${item.id}`}
            onClick={(e) => {
              if (item.type === "Folder") {
                e.preventDefault();
                setFolderState((state) => ({
                  ...state,
                  [item.id]: !state[item.id],
                }));
              }
            }}
            className={classNames(
              itemId === item.id
                ? "bg-indigo-700 text-white"
                : "text-indigo-200 hover:text-white hover:bg-indigo-700",
              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center"
            )}
          >
            <span className="w-6">
              <Icon
                className={classNames(
                  itemId === item.id
                    ? "text-white"
                    : "text-indigo-200 group-hover:text-white",
                  "h-6 w-6 shrink-0"
                )}
                aria-hidden="true"
              />
            </span>
            {item.name}
          </Link>
        </li>
        {item.children?.length &&
        (folderState[item.id] ||
          item?.children.some((c) => c.id === itemId)) ? (
          <ul className="pl-4">
            <Items items={item.children ?? []} />
          </ul>
        ) : null}
      </Fragment>
    );
  });
}

function getComponentForItem(type: ItemVariant, isOpen: boolean): ElementType {
  switch (type) {
    case "Document":
      return () => <DocumentIcon />;
    case "Folder":
      if (isOpen) {
        return () => <FolderOpenIcon />;
      }
      return () => <FolderIcon />;
    case "List":
      return () => <ListBulletIcon />;
  }
}
