import { TextInput, Button } from "@/components";
import type { IFormData, IUser, IForm } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SelectInput from "./selectInput";
import { useRouter } from "next/router";
import { axios } from "./utils";
import { useDispatch } from "react-redux";
import { login } from "@/store";

const SignUpForm: React.FC<IForm> = ({ type }) => {
  const initialData: IFormData = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    password: "",
    ...(type !== "sign up" && { mother_id: 0, father_id: 0 }),
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  const [data, setData] = useState<IFormData>(initialData);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios<IUser[]>({ method: "GET", url: "/api/users" });
      setUsers(res);
    };
    getUsers();
  }, []);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { id, value } = e.target as any;
    if (["mother_id", "father_id"].includes(id)) {
      value = parseInt(value);
    }
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "sign up") {
      const res = await axios<{ access_token: string; user: IUser }>({
        method: "POST",
        url: "/api/signup",
        data,
      });
      localStorage.setItem("access_token", res.access_token);
      dispatch(login(res.user));
      router.push("/");
    } else if (type === "add") {
      await axios({
        method: "POST",
        url: "/api/users/add",
        data,
      });
      setData(initialData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6 capitalize">
          {type} {type !== "sign up" ? "member" : ""}
        </h2>
        {type !== "sign up" && (
          <Button
            type="button"
            status="success"
            text="go back"
            onClick={() => router.back()}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-5">
        <TextInput
          className="mb-4"
          label="name"
          id="name"
          placeholder="Your Name"
          value={data.name}
          type="text"
          onChange={handleInput}
        />
        <TextInput
          className="mb-4"
          label="email"
          id="email"
          placeholder="Your Email"
          value={data.email}
          type="text"
          onChange={handleInput}
        />
        <TextInput
          className="mb-4"
          label="date of birth"
          id="dob"
          value={data.dob}
          type="date"
          onChange={handleInput}
        />
        <TextInput
          className="mb-4"
          label="address"
          id="address"
          placeholder="Your Address"
          value={data.address}
          type="text"
          onChange={handleInput}
        />
        <TextInput
          className="mb-4"
          label="phone number"
          id="phone"
          placeholder="Your Phone Number"
          value={data.phone}
          type="tel"
          onChange={handleInput}
        />
        <TextInput
          className="mb-6"
          label="password"
          id="password"
          placeholder="Your Password"
          value={data.password as string}
          type="password"
          onChange={handleInput}
        />
        {type !== "sign up" && (
          <>
            <SelectInput
              className="mb-4"
              label="mother"
              id="mother_id"
              value={String(data.mother_id as number)}
              onChange={handleInput}
              data={users}
            />
            <SelectInput
              className="mb-4"
              label="father"
              id="father_id"
              value={String(data.father_id as number)}
              onChange={handleInput}
              data={users}
            />
          </>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button text={type} status="primary" type="submit" />
      </div>
    </form>
  );
};

export default SignUpForm;
