import {useQuery} from 'react-query';
import {getWorkExperience} from 'services/user.service';

export default function useWorkExperience(userId: string) {
  return useQuery(
    ['work-experience', userId],
    async () => await getWorkExperience(userId),
    {
      enabled: userId ? true : false
    }
  );
}
