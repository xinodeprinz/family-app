import { type ISelectInput } from "@/types";

const SelectInput = ({
  id,
  label,
  value,
  className,
  data,
  onChange,
}: ISelectInput) => {
  return (
    <div className={className}>
      <label
        className="block text-gray-700 capitalize text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="shadow appearance-none capitalize border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      >
        <option value={0}>Select...</option>
        {data.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
