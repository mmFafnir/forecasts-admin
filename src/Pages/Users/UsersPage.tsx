import TableUsers from "../../components/Tables/TableUsers";

const UsersPage = () => {
  return (
    <>
      <div className="flex items-center">
        <h1>ПОЛЬЗОВАТЕЛИ</h1>
      </div>
      <div className="mt-6"></div>
      <TableUsers />
    </>
  );
};

export default UsersPage;
