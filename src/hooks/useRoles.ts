import {useQuery} from 'react-query';
import {getUserRoles} from 'services/general.service';

export default function useRoles() {
  return useQuery('roles', async () => await getUserRoles());
}
