import { useEffect } from "react";
import { getCurrentUser } from "../api/auth";

export default function useAuth() {
  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const handleGetCurrentUser = async () => {
    getCurrentUser(() => {});
  };
}
