import {useQuery} from 'react-query';
import {getShareholder} from 'services/user.service';

export default function useShareholders(userId:string) {
  return useQuery('share-holders', async () => await getShareholder(userId));
}
