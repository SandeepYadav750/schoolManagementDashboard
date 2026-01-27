import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

const InputFields = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex-1 flex flex-col gap-2"}>
      <label className="text-xs text-gray-700 ">{label}</label>

      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
        defaultValue={defaultValue}
        {...inputProps}
      />

      {error && error.message && (
        <p className="text-red-500 text-xs">{error.message}</p>
      )}
    </div>
  );
};

export default InputFields;
