import { User, fetchUser, hash } from "@app/api";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const userAtom = atom<User | null>({
  key: "user",
  // NOTE - tw: could use @recoiljs/refine to properly type this
  default: JSON.parse(
    localStorage.getItem("user") ?? "null"
  ) as unknown as User,
});

const isSignedInSelector = selector({
  key: "isSignedIn",
  get: ({ get }) => get(userAtom) !== null,
});

export function useUser() {
  /** Custom */
  const navigate = useNavigate();

  /** State */
  const [user, setUser] = useRecoilState(userAtom);
  const isSignedIn = useRecoilValue(isSignedInSelector);

  /** Callbacks */
  async function signIn(email: string) {
    faker.seed(hash(email));

    const user = await fetchUser(email);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  }

  async function signOut() {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }

  /** Return */
  return {
    signIn,
    signOut,
    isSignedIn,
    user,
  };
}
