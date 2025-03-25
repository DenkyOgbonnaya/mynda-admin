import { IFile } from "types/file.type";
import { handleDeleteRequest, handlePostRequest } from "./http.service";

export const uploadeFile = async (file: FormData) => {
  const res = await handlePostRequest<FormData, IFile>("/files/single", file);

  const fileRes: IFile = {
    ...res.data,
    name: "",
  };

  return {
    data: fileRes,
    message: res.message,
  };
};

export const deleteFile = async (id: string) => {
  return await handleDeleteRequest(`/files/${id}`);
};
