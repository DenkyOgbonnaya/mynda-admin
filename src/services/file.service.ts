
import { handleDeleteRequest, handlePostRequest } from "./http.service";
import {FileUploadRes} from "types/file.type"

export const uploadeFile = async (file: FormData) => {
  return await handlePostRequest<FormData, FileUploadRes>(
    "/files/single",
    file
  );
};

export const deleteFile = async (fileId: string) => {
  return await handleDeleteRequest(`/files/${fileId}`);
};
