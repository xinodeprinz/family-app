import { type RootState, logout } from "@/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { sweetAlert } from "./utils";
import type { IUser } from "@/types";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user) as IUser;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    router.push("/signin");
    sweetAlert({ icon: "success", title: "Logout successful" });
  };
  return (
    <div className="bg-blue-700 w-full py-4">
      <div className="container w-4/5 mx-auto text-white capitalize flex justify-between items-center">
        <div className="font-semibold">{user?.name}</div>
        <button className="capitalize" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Header;
