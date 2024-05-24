import { useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "services/user.service";
import { PaginationQuery } from "types/http.type";

export default function useUsers(defaultQuery?: PaginationQuery) {
  const [query, setQuery] = useState(
    defaultQuery || {
      page: 1,
      limit: 20,
    }
  );

  const { page } = query;
  const { isLoading, data, refetch } = useQuery(
    ["users", page],
    async () => await getUsers(query)
  );

  const onQueryChange = (
    name: keyof PaginationQuery,
    value: string | number
  ) => {
    setQuery((q) => ({ ...q, [name]: value }));
  };

  const onFilter = (queryFilter: PaginationQuery) => {
    setQuery(queryFilter);
  };

  return { isLoading, data, onQueryChange, onFilter, refetch };
}
