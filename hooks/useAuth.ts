import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";
import { useActions, useSignal } from "@dilane3/gx";
import { NetworkDataType, TermsDataType, UserDataType } from "../gx/signals";
import storage from "../storage";
import UsersRepository from "../storage/db/users";
import { DASK_USER_ID } from "../constants";

export default function useAuth() {
  // Global state
  const { user, ready } = useSignal<UserDataType>("currentUser");
  const { isInternetReachable, ready: isNetworkReady } =
    useSignal<NetworkDataType>("network");
  const { read: termsRead } = useSignal<TermsDataType>("terms");

  const { login } = useActions("currentUser");
  const { show: toast } = useActions("toast");

  // Local state
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (!user && termsRead) handleGetCurrentUser();
  }, [ready, isNetworkReady, termsRead]);

  const handleGetCurrentUser = async () => {
    const uid = await storage.getItem(DASK_USER_ID);

    if (uid) {
      const user = await UsersRepository.findByUid(uid);

      if (user) {
        login(user);
      }
    } else {
      if (!isInternetReachable) {
        toast({
          message: "No internet connection",
          type: "info",
        });
      } else {
        if (isNetworkReady && !isConnecting) {
          setIsConnecting(true);
          
          getCurrentUser(login);
        }
      }
    }
  };
}
