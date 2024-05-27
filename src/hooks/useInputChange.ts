import { ChangeEvent, useState } from "react";

export type InputChangeHandler = (
  e:
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
    | ChangeEvent<HTMLTextAreaElement>
) => void;


export default function useInputChange<T>(val: T) {
  const [state, setState] = useState<T>(val);

  const onChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    // @ts-ignore
    const value = e.target.checked || e.target.value;

    setState((curr) => ({
      ...curr,
      [e.target.name]: value,
    }));
  };

  const onChangeByNameValue = (
    name: keyof T,
    value: string | boolean | number | Record<string, string> | any
  ) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return { state, onChange, onChangeByNameValue, setState };
}