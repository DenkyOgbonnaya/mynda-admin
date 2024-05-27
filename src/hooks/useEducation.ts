import {useQuery} from 'react-query';
import {getEducation} from 'services/user.service';

export default function useEducation(userId: string) {
  return useQuery(
    'education',
    async () => await getEducation(userId),
    {
      enabled: userId ? true : false
    }
  );
}
