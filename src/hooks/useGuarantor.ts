import {useQuery} from 'react-query';
import { getGuarantor } from 'services/user.service';

export default function useGuarantor(userId: string) {
  return useQuery(
    'guarantor',
    async () => await getGuarantor(userId),
    {
      enabled: userId ? true : false
    }
  );
}
