import useInputChange from "hooks/useInputChange";
import { FormEvent, useState } from "react";
import { UserCreate } from "types/user.type";
import useStates from "hooks/useStates";
import useLgas from "hooks/useLgas";

interface Props {
  onSubmit: (record: UserCreate) => void;
  isLoading?: boolean;
  onCancel: () => void;
}
export default function AgentForm({ onSubmit, isLoading, onCancel }: Props) {
  const { state, onChange } = useInputChange<UserCreate>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "Agency",
    fullName: "",
    confirmPassword: "",
    state: "",
    lga: "",
  });
  const states = useStates();
  const lgas = useLgas(state.state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: UserCreate = {
      ...state,
      confirmPassword: state.password,
    };
    onSubmit(payload);
  };

  return (
    <form action="#!" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          First Name
        </label>
        <input
          type="text"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="First Name"
          name="firstName"
          onChange={onChange}
          value={state.firstName}
          required
        />
      </div>
      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Last Name
        </label>
        <input
          type="text"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Last Name"
          name="lastName"
          onChange={onChange}
          value={state.lastName}
          required
        />
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">Email</label>
        <input
          type="email"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder=""
          name="email"
          onChange={onChange}
          value={state.email}
          required
        />
      </div>
      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Phone Number
        </label>
        <input
          type="text"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder=""
          name="phoneNumber"
          onChange={onChange}
          value={state.phoneNumber}
          required
        />
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">State</label>
        <select
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          name="state"
          onChange={onChange}
          value={state.state}
        >
          <option value="">Select State</option>
          {states.map((state: any) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">LGA</label>
        <select
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          name="lga"
          onChange={onChange}
          value={state.lga}
        >
          <option value="">Select Lga</option>
          {lgas.map((state: any) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="inline-block mb-2 text-base font-medium">
          Password
        </label>
        <input
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={state.password}
          required
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
          {isLoading ? "Loading..." : "Create Agent"}
        </button>
      </div>
    </form>
  );
}
