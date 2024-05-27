import {useQuery} from 'react-query';
import {getSubscriptionPlans} from 'services/subscription.service';

export default function useSubscriptionPlans(role: string) {
  return useQuery(
    ['plans', role],
    async () => await getSubscriptionPlans(role),
    {
      enabled: role ? true : false,
    },
  );
}
