import {useQuery} from 'react-query';
import { getUserProfile } from 'services/user.service';

export default function useUserProfile(userId: string) {
  return useQuery(
    ['profile', userId],
    async () => await getUserProfile(userId),
    {
      enabled: userId ? true : false
    }
  );
}
