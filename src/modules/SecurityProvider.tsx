import { FC, ReactNode, useEffect, useState } from "react";
import { useTypeDispatch } from "../hooks/useTypeDispatch";
import { getUserInfo } from "../store/Slices/userSlices/asyncAction";
import { Navigate, useNavigate } from "react-router-dom";
import { Spin, notification } from "antd";
import { useTypeSelector } from "../hooks/useTypeSelector";

interface IProps {
  children: ReactNode;
}
const SecurityProvider: FC<IProps> = ({ children }) => {
  const { user } = useTypeSelector((state) => state.user);

  const dispatch = useTypeDispatch();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserInfo()).then((res) => {
      if (!res.payload) return navigate("/auth");
      setIsLoading(false);
      notification.success({
        message: "Привет)",
        description: "Приятной работы!",
        duration: 1.5,
      });
    });
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  if (!user) return <Navigate to={"/auth"}></Navigate>;
  return <>{children}</>;
};

export default SecurityProvider;
