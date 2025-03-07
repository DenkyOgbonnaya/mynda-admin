import { useQuery } from "react-query";
import { getServicePlans } from "services/subscription.service";

export default function useServicePlans() {
  return useQuery("service-plans", async () => await getServicePlans());
}
