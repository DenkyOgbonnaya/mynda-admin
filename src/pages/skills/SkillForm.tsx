import useInputChange from "hooks/useInputChange";
import { FormEvent, useEffect } from "react";
import { Skill, SkillCreate } from "types/general.interface";

interface Props {
  onSubmit: (record: SkillCreate) => void;
  data: Skill | null;
  isLoading?: boolean;
  onCancel: () => void;
}
export default function SkillForm({
  onSubmit,
  data,
  isLoading,
  onCancel,
}: Props) {
  const { state, onChange, setState } = useInputChange<SkillCreate>({
    serviceCategory: "",
    name: "",
  });

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(state);
  };

  return (
    <form action="#!" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">Name</label>
        <input
          type="text"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Cooking, Care giving etc"
          name="name"
          onChange={onChange}
          value={state.name}
        />
      </div>

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
