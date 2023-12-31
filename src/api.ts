import { faker } from "@faker-js/faker";

export async function fakePromise<T>(data: T) {
  return new Promise<T>((resolve) =>
    setTimeout(() => resolve(data), faker.number.int({ min: 200, max: 2000 }))
  );
}

export function hash(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Users
 */

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export function fetchUser(email: string): User {
  faker.seed(hash(email));

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: email,
    avatar: faker.internet.avatar(),
  };
}

/**
 * Teams
 */

export type ItemVariant = "Folder" | "List" | "Document";

export type Item = {
  id: string;
  name: string;
  type: ItemVariant;
  children?: Item[];
};

// For some reason importing Item is weird :/
export type ItemType = Item;

export function sortItems(a: Item, b: Item) {
  const typeOrder = {
    Folder: 0,
    Document: 1,
    List: 2,
  };

  if (typeOrder[a.type] < typeOrder[b.type]) {
    return -1;
  }
  if (typeOrder[a.type] > typeOrder[b.type]) {
    return 1;
  }
  // If types are equal, sort by name
  return a.name.localeCompare(b.name);
}

export type Team = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  items: Item[];
};

export async function fetchTeams(userId: string) {
  faker.seed(hash(userId));
  return fakePromise<Team[]>(
    faker.helpers.multiple(
      () => ({
        id: faker.string.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        name: faker.company.name(),
        items: faker.helpers.multiple(
          () => {
            const type = faker.helpers.arrayElement<ItemVariant>([
              "Folder",
              "List",
              "Document",
            ]);

            let children = undefined;

            if (type === "Folder") {
              children = faker.helpers.multiple(makeListOrDocument, {
                count: { min: 1, max: 5 },
              });
            }

            return {
              id: faker.string.uuid(),
              name: getFileNameForType(type),
              type,
              children,
            };
          },
          { count: { min: 3, max: 10 } }
        ),
      }),
      { count: { min: 1, max: 5 } }
    )
  );
}

function makeListOrDocument() {
  return {
    id: faker.string.uuid(),
    name: getFileNameForType(faker.helpers.arrayElement(["List", "Document"])),
    type: faker.helpers.arrayElement<ItemVariant>(["List", "Document"]),
  };
}

function getFileNameForType(type: ItemVariant) {
  switch (type) {
    case "Folder":
      return faker.person.jobDescriptor();
    case "List":
      return faker.company.buzzNoun();
    case "Document":
      return faker.commerce.productName();
  }
}

/**
 * Lists
 */

type Status = {
  id: string;
  color: string;
  name: string;
  order: number;
};

type Task = {
  id: string;
  name: string;
  status: Status;
  priority: Status;
  createdAt: Date;
  assignedTo: User;
  dueAt: Date;
};

type List = {
  id: string;
  name: string;
  tasks: Task[];
};

export async function getList(listId: string): Promise<List> {
  faker.seed(hash(listId));

  return fakePromise<List>({
    id: listId,
    name: faker.company.buzzNoun(),
    tasks: faker.helpers.multiple(
      () => ({
        id: faker.string.uuid(),
        createdAt: faker.date.past(),
        dueAt: faker.date.future(),
        name: faker.company.buzzPhrase(),
        assignedTo: fetchUser(faker.internet.email()),
        status: faker.helpers.arrayElement([
          // Todo, In Progress, Blocked, Complete
          {
            id: faker.string.uuid(),
            name: "Todo",
            color: "slategrey",
            order: 0,
          },
          {
            id: faker.string.uuid(),
            name: "In Progress",
            color: "MediumSeaGreen",
            order: 1,
          },
          {
            id: faker.string.uuid(),
            name: "Blocked",
            color: "red",
            order: 2,
          },
          {
            id: faker.string.uuid(),
            name: "Complete",
            color: "seagreen",
            order: 3,
          },
        ]),
        priority: faker.helpers.arrayElement([
          {
            id: faker.string.uuid(),
            name: "Low",
            color: "slategrey",
            order: 0,
          },
          {
            id: faker.string.uuid(),
            name: "Medium",
            color: "orange",
            order: 1,
          },
          {
            id: faker.string.uuid(),
            name: "High",
            color: "red",
            order: 2,
          },
          {
            id: faker.string.uuid(),
            name: "Urgent",
            color: "darkred",
            order: 3,
          },
        ]),
      }),
      { count: { min: 20, max: 30 } }
    ),
  });
}
