import { FC } from "react";
import MatchEditForm from "../modules/Forms/MatchEditForm";

const MatchElementPage: FC = () => {
  return (
    <div className="form m-12">
      <h1 className="mb-5">Редактировать Матч</h1>
      <MatchEditForm />
    </div>
  );
};

export default MatchElementPage;
