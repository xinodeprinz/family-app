import { TextInput, Button, Protected } from "@/components";
import type { ISignInData, IUser } from "@/types";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { axios } from "@/components/utils";
import { useDispatch } from "react-redux";
import { login } from "@/store";
import { useRouter } from "next/router";

const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState<ISignInData>({ email: "", password: "" });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios<{ access_token: string; user: IUser }>({
      method: "POST",
      url: "/api/signin",
      data,
    });
    localStorage.setItem("access_token", res.access_token);
    dispatch(login(res.user));
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
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
            className="mb-6"
            label="password"
            id="password"
            placeholder="Your Password"
            value={data.password}
            type="password"
            onChange={handleInput}
          />
          <Button text="sign in" type="submit" status="primary" />
        </form>
        <div className="text-center text-gray-700">
          Don't have an account?
          <Link
            className="ml-1 font-bold text-blue-500 capitalize hover:text-blue-800"
            href="/signup"
          >
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Protected(SignInForm, false);
