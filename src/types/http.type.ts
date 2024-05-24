export interface HttpResponse<T> {
  message: string;
  data: T;
  status: string;
}

export interface PaginationDataRes<T> {
  page: number;
  limit: number;
  total: number;
  data: T;
}
export interface HttpError {
  response: {
    data: {
      message: string;
      subMessage: string;
    };
  };
}
export interface PaginationQuery {
  page: number;
  limit: number;
}
