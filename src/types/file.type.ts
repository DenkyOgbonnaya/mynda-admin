export interface IFile {
  name: string;
  url: string;
  id: string;
  size: number;
}

export interface FileUploadRes {
  url: string;
  id: string;
  fileName: string;
  size: number;
  type: string;
}
