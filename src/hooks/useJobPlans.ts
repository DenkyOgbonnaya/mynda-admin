import {useQuery} from 'react-query';
import {getJobPlans} from 'services/subscription.service';

export default function useJobPlans() {
  return useQuery(['job-plans'], async () => await getJobPlans());
}
