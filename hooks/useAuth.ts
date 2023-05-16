import { useEffect } from "react";
import { getCurrentUser } from "../api/auth";
import { useActions, useSignal } from "@dilane3/gx";
import { UserDataType } from "../gx/signals";
import storage from "../storage";
import UsersRepository from "../storage/db/users";

export default function useAuth() {
  // Global state
  const { user } = useSignal<UserDataType>("currentUser");
  const { login } = useActions("currentUser");

  useEffect(() => {
    console.log({user})
    if (!user) handleGetCurrentUser();
  }, []);

  const handleGetCurrentUser = async () => {
    const uid = await storage.getItem("dask-uid");

    console.log({ uid })

    if (uid) {
      console.log("dedans")
      const user = await UsersRepository.findByUid(uid);

      console.log({ users: user })

      if (user) {
        login(user);
      }
    } else {
      getCurrentUser(login);
    }
  };
}
