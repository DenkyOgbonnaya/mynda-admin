import {useQuery} from 'react-query';
import {getSkills} from 'services/general.service';

export default function useSkills(serviceCategory: string) {
  return useQuery('skills', async () => await getSkills(serviceCategory));
}
