import { ChangeEvent } from "react";

interface SelectProps {
  id?: string;
  defaultLabel?: string;
  options: [string, string[]][] | string[];
  value?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  defaultLabel,
  id,
  options,
  value,
  onChange,
}: SelectProps) => {
  return (
    <select
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={onChange}
      value={value}
    >
      <option value="">{defaultLabel || "Selecciona una opción"}</option>

      {options?.map((option) => {
        if (typeof option === "string") {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        }

        return (
          <option key={option[0]} label={option[0]}>
            {option[0]}
          </option>
        );
      })}
    </select>
  );
};

export { Select };
