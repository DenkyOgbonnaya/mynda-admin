import httpClient from "libs/axios.lib";
import { handleDeleteRequest } from "./http.service";
import { FileUploadRes } from "types/file.type";
import { HttpResponse } from "types/http.type";
import { AxiosResponse } from "axios";

export const uploadeFile = async (file: FormData) => {
  const data = await httpClient.post<
    FormData,
    AxiosResponse<HttpResponse<FileUploadRes>>
  >("/files/single", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

export const deleteFile = async (fileId: string) => {
  return await handleDeleteRequest(`/files/${fileId}`);
};
