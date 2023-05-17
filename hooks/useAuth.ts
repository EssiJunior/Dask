import { useEffect } from "react";
import { getCurrentUser } from "../api/auth";
import { useActions, useSignal } from "@dilane3/gx";
import { UserDataType } from "../gx/signals";
import storage from "../storage";
import UsersRepository from "../storage/db/users";
import { DASK_USER_ID } from "../constants";

export default function useAuth() {
  // Global state
  const { user, ready } = useSignal<UserDataType>("currentUser");
  const { login } = useActions("currentUser");

  useEffect(() => {
    if (ready) {
      if (!user) handleGetCurrentUser();
    }
  }, [ready]);

  const handleGetCurrentUser = async () => {
    const uid = await storage.getItem(DASK_USER_ID);

    console.log({ uid })

    if (uid) {
      const user = await UsersRepository.findByUid(uid);

      if (user) {
        login(user);
      }
    } else {
      getCurrentUser(login);
    }
  };
}
