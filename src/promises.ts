import { faker } from "@faker-js/faker";

export async function fakePromise<T>(data: T) {
  return new Promise<T>((resolve) =>
    setTimeout(() => resolve(data), faker.number.int({ min: 200, max: 2000 }))
  );
}
