import { useQuery } from "react-query";
import { getUserStat } from "services/user.service";

export default function useUserStats() {
  return useQuery("stats", async () => await getUserStat());
}
