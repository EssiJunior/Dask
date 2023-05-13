import { useEffect } from "react";
import { getCurrentUser } from "../api/auth";
import { useActions, useSignal } from "@dilane3/gx";
import { UserDataType } from "../gx/signals";

export default function useAuth() {
  // Global state
  const { user } = useSignal<UserDataType>("currentUser");
  const { login } = useActions("currentUser");

  useEffect(() => {
    console.log({user})
    if (!user) handleGetCurrentUser();
  }, []);

  const handleGetCurrentUser = async () => {
    getCurrentUser(login);
  };
}
