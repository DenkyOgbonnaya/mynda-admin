import { useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "services/user.service";
import { PaginationQuery } from "types/http.type";
import { UserQuery } from "types/user.type";

export default function useUsers(defaultQuery?: UserQuery) {
  const [query, setQuery] = useState(
    defaultQuery || {
      page: 1,
      limit: 20,
      search: "",
    }
  );

  const { page, search } = query;
  const { isLoading, data, refetch } = useQuery(
    ["users", page, search],
    async () => await getUsers(query)
  );

  const onQueryChange = (name: keyof UserQuery, value: string | number) => {
    setQuery((q) => ({ ...q, [name]: value }));
  };

  const onFilter = (queryFilter: UserQuery) => {
    setQuery(queryFilter);
  };

  return { isLoading, data, onQueryChange, onFilter, refetch };
}
