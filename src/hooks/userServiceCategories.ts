import {useQuery} from 'react-query';
import {getServiceCategories} from 'services/general.service';

export default function useServiceCategories() {
  return useQuery('categories', async () => await getServiceCategories());
}
