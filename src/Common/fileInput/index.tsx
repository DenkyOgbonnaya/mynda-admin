/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { CloudCogIcon, DeleteIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { deleteFile, uploadeFile } from "services/file.service";
import { IFile } from "types/file.type";
import { truncateWords } from "utills/helper";

interface Props {
  label?: string;
  onDelete?: () => void;
  onUpload: (file: IFile) => void;
  file: IFile;
  allowedType?: string[];
}
export default function FileInput({
  label = "Upload file",
  onDelete,
  onUpload,
  file: fileValue,
  allowedType = ["png", "jpg", "jpeg", "ppt", "bmp", "pdf"],
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<IFile | null>(null);
  const [message, setMessage] = useState("");
  const size = "10485760"; // 10mb limit

  const handleUpload = () => {
    ref?.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) {
      const file = files[0];

      if (isValidFileSize(file?.size) && isValidFileType(file)) {
        handleUplaodFile(file);
        setFile(files[0]);
      }
    }
  };

  const { isLoading: uploading, mutate: uploadMutation } = useMutation(
    async (upload: FormData) => await uploadeFile(upload),
    {
      onSuccess(data) {
        onUpload(data.data);
        toast.success("File uploaded");
      },
    }
  );

  const { isLoading: deleting, mutate: deleteMutate } = useMutation(
    async (upload: IFile) => {
      return await deleteFile(upload?.id!);
    },
    {
      onSuccess(data) {
        setFile(null);
        setUpload(null);
        toast.success("File deleted");

        if (onDelete) onDelete();
      },
    }
  );

  const handleDelete = (e: any) => {
    e.stopPropagation();
    deleteMutate(fileValue!);
  };

  const handleUplaodFile = (file: File) => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);

      uploadMutation(formData);
    } else {
      alert("Select file");
    }
  };

  const isValidFileSize = (fileSize: number) => {
    if (fileSize > Number(size)) {
      setMessage("File size must be 10mb max");
      return false;
    }
    setMessage("");
    return true;
  };

  // allowed file type: ["pdf", "txt", "docx", "xlsx"]
  const isValidFileType = (file: File) => {
    const allowedExtensions = allowedType;
    const fileExtension = file.type.split("/")[1];

    if (!allowedExtensions.includes(fileExtension)) {
      setMessage(
        `required file type is any of: ${allowedExtensions.toLocaleString()}`
      );

      return false;
    }
    setMessage("");
    return true;
  };
  return (
    <>
      <button
        onClick={handleUpload}
        className=" border border-dashed border-border rounded-sm p-1 relative w-full "
        aria-label="select file"
        type="button"
      >
        <div className="flex flex-col justify-center items-center gap-3 border bg-input rounded-sm p-2 min-h-[100px]">
          <CloudCogIcon />
          <span className="text-sm text-text font-body">{label}</span>
          {file && (
            <span className="text-xs text-muted font-body">
              {truncateWords(fileValue?.name?.split(".")[0], 15)}.
              {fileValue?.name?.split(".")[1]}
            </span>
          )}
          {deleting && (
            <span className="text-sm text-notice font-body">
              Deleting file...
            </span>
          )}
          {uploading && (
            <span className="text-sm text-notice font-body">
              Uploadin file... Please wait!
            </span>
          )}
          {message && (
            <span className="text-sm text-notice font-body">{message}</span>
          )}
        </div>
        {fileValue && (
          <button
            onClick={handleDelete}
            type="button"
            className=" absolute right-0 top-0"
          >
            <DeleteIcon />
          </button>
        )}
        <p className="w-fit-content mt-2">
          {truncateWords(fileValue?.url, 20)}
        </p>
      </button>
      <input
        onChange={handleFileChange}
        className=" opacity-0"
        type="file"
        ref={ref}
      />
      <ToastContainer closeButton={false} limit={1} />
    </>
  );
}
