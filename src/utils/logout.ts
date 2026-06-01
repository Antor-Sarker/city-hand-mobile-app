import { logoutApi } from "@/api/auth.service";
import { tokenStorage } from "../storage/tokenStorage";

export const forceLogout = async () => {
  try {
    await logoutApi();
  } finally {
    await tokenStorage.clearTokens();
  }
};
