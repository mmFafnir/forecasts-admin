import axios from "../../core/axios";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Space, Spin } from "antd";
import UpdateAdminForm from "../../modules/Forms/AdminsForm/UpdateAdminForm";
import { TypeUser } from "../../store/Slices/userSlices/interface";
import { notify } from "../../assets/scripts/notify";

export const asyncSingleUser = async (id: string) => {
  const { data } = await axios.get(`/single_page_admin?admin_id=${id}`);
  return data.data;
};

const AdminElementPage: FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<TypeUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    asyncSingleUser(id)
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        notify({
          type: "error",
          message: "Произошла ошибка, попробуйте позже",
        });
        navigate("/users");
      });
  }, []);

  return (
    <div className="form">
      <h1 className="mb-5">Редактировать Модератора</h1>
      {!user ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <UpdateAdminForm user={user} />
      )}
    </div>
  );
};

export default AdminElementPage;
