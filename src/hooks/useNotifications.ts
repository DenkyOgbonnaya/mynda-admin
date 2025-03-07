import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getNotifications } from "services/notification.service";
import { PaginationQuery } from "types/http.type";

export default function useNotifications(
  limnit: number = 20,
  startDate?: string,
  endDate?: string
) {
  const [refreshing, setRefreshing] = useState(false);
  const LIMIT = limnit;

  const fetchRecords = async ({ pageParam = 1 }) => {
    const query: PaginationQuery = {
      page: pageParam,
      limit: LIMIT,
      // startDate,
      // endDate,
    };
    const response = await getNotifications(query);

    return {
      results: response.data.data,
      totalPages: Math.ceil(response.data.total / LIMIT),
      nextPage: pageParam + 1,
    };
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    hasPreviousPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(["notifications", startDate, endDate], fetchRecords, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
  });

  const records = data?.pages.map((page) => page.results)?.flat();
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const handleEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  return {
    data: records,
    isLoading,
    isFetchingNextPage,
    refreshing,
    handleRefresh,
    handleEndReached,
    hasNextPage,
    hasPreviousPage,
  };
}
