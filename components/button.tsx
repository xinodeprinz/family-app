import { type IButton } from "@/types";

const Button: React.FC<IButton> = ({ status, text, type, className, onClick }) => {
  let buttonClassName =
    "bg-blue-500 hover:bg-blue-700 text-white capitalize font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  if (status === "success") {
    buttonClassName =
      "bg-green-500 hover:bg-green-700 text-white capitalize font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  } else if (status === "danger") {
    buttonClassName =
      "bg-red-500 hover:bg-red-700 text-white capitalize font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  }

  return (
    <button className={`${buttonClassName} ${className}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
