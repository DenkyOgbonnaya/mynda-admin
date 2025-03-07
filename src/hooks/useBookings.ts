import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getBookings } from "services/booking.service";
import { PaginationParams } from "types/general.interface";

export default function useBookings(limit = 20) {
  const [refreshing, setRefreshing] = useState(false);
  const LIMIT = limit;

  const fetchRecords = async ({ pageParam = 1 }) => {
    const query: PaginationParams = {
      page: pageParam,
      limit: LIMIT,
    };
    const response = await getBookings(query);

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
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(["bookings"], fetchRecords, {
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
  };
}
