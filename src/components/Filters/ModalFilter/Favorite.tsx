import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { Switch } from "antd";
import { setFavorite } from "../../../store/Slices/filterSlice";

const Favorite = () => {
  const { favorite } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();
  const onChange = (value: boolean) => {
    dispatch(setFavorite(value));
  };

  return (
    <>
      <div className="flex ml-2" style={{ width: 180 }}>
        <div style={{ transform: "scale(1.2)" }}>
          <Switch checked={favorite} onChange={onChange} />
        </div>
      </div>
    </>
  );
};

export default Favorite;
