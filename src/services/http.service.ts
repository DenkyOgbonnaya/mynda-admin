import httpClient from "libs/axios.lib";
import { HttpResponse } from "types/http.type";

export const handleGetRequest = async <T>(
  payload: string
): Promise<HttpResponse<T>> => {
  try {
    const { data } = await httpClient.get<HttpResponse<T>>(payload);

    return data;
  } catch (err) {
    throw err;
  }
};

export const handlePostRequest = async <T, G>(
  path: string,
  payload: T
): Promise<HttpResponse<G>> => {
  try {
    const { data } = await httpClient.post(`${path}`, payload);
    return data;
  } catch (err) {
    throw err;
  }
};
export const handlePutRequest = async <T, G>(
  path: string,
  payload: T
): Promise<HttpResponse<G>> => {
  try {
    const { data } = await httpClient.put(`${path}`, payload);
    return data;
  } catch (err) {
    throw err;
  }
};
export const handlePatchRequest = async <T, G>(
  path: string,
  payload: T
): Promise<HttpResponse<G>> => {
  try {
    const { data } = await httpClient.patch(`${path}`, payload);
    return data;
  } catch (err) {
    throw err;
  }
};
export const handleDeleteRequest = async <T>(
  payload: string
): Promise<HttpResponse<T>> => {
  try {
    const { data } = await httpClient.delete(`${payload}`);
    return data;
  } catch (err) {
    throw err;
  }
};
