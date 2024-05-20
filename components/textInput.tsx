import { type ITextInput } from "@/types";

const TextInput = ({
  id,
  label,
  type,
  value,
  placeholder,
  className,
  onChange,
}: ITextInput) => {
  return (
    <div className={className}>
      <label
        className="block text-gray-700 capitalize text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
