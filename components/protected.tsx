import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RootState } from "@/store";

const Protected = (
  WrappedComponent: React.ComponentType<any>,
  isAuthRoute: boolean
) => {
  const WrapperComponent: React.FC<any> = (props) => {
    const router = useRouter();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      if (isAuthRoute && !isAuth) {
        router.push("/signin");
      } else if (!isAuthRoute && isAuth) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }, [isAuth, isAuthRoute, router]);

    return loading ? "Loading..." : <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default Protected;
