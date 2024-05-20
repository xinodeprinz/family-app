import { Form, Protected } from "@/components";
import Link from "next/link";

const SignUpForm: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-2/3 mx-auto">
        <Form type="sign up" />
        <div className="text-center text-gray-700">
          Already have an account?
          <Link
            className="ml-1 font-bold text-blue-500 capitalize hover:text-blue-800"
            href="/signin"
          >
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Protected(SignUpForm, false);
