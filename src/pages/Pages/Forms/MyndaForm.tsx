import FileInput from "Common/fileInput";
import useInputChange from "hooks/useInputChange";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { updateMynda } from "services/user.service";

import { IDENTITY_DOCUMENT_TYPES } from "shared";
import {
  Mynda,
  MyndaIdentity,
  MyndaRegistrationInput,
} from "types/mynda.interface";

interface Props {
  onSubmit?: () => void;
  data: Mynda | null;
  onCancel: () => void;
}
export default function MyndaForm({ onSubmit, data, onCancel }: Props) {
  const {
    state: input,
    onChangeByNameValue,
    onChange,
    setState,
  } = useInputChange<MyndaIdentity>(
    data || {
      profilePicture: null,
      document: null,
      docType: "",
      docNumber: "",
    }
  );
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const { isLoading, mutate } = useMutation(
    async (cred: MyndaRegistrationInput) => updateMynda(data?.user._id!, cred),
    {
      onSuccess(res) {
        queryClient.invalidateQueries(["profile", data?.user._id!]);
        alert("Update successful");
        if (onSubmit) onSubmit();
      },
      onError(error: any) {
        setErrorMessage(error.response.data.message);
      },
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const payload: MyndaRegistrationInput = {
      ...data!,
      ...input,
      userId: data?.user._id,
    };

    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer closeButton={false} limit={1} />
      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Profile Photo
        </label>

        <FileInput
          file={input.profilePicture!}
          label="Profile photo"
          onUpload={(file) => onChangeByNameValue("profilePicture", file)}
        />
      </div>
      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Document Type
        </label>
        <select
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          value={input.docType}
          name="docType"
          onChange={onChange}
          required
        >
          <option value="">Select Service Category</option>
          {IDENTITY_DOCUMENT_TYPES?.map((doc) => (
            <option key={doc.label} value={doc.value}>
              {doc.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Document Number
        </label>
        <input
          type="text"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Enter document number"
          name="docNumber"
          value={input.docNumber}
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Upload identity Document
        </label>

        <FileInput
          file={input.document!}
          label="Upload Identity Document"
          onUpload={(file) => onChangeByNameValue("document", file)}
        />
      </div>
      {errorMessage && (
        <span className=" text-red-500 text-sm my-4">{errorMessage}</span>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="reset"
          data-modal-close="addDocuments"
          className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-600 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
