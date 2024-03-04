import { Select } from "antd";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { setTir } from "../../../store/Slices/filterSlice";

const tirs = new Array(20).fill(null);
const TirLeagues = () => {
  const dispatch = useTypeDispatch();
  const onChangeTir = (value: string) => {
    dispatch(setTir(value));
  };
  return (
    <div style={{ minWidth: 200 }}>
      <Select
        style={{ width: "100%", textAlign: "left" }}
        defaultActiveFirstOption
        onChange={onChangeTir}
        defaultValue={""}
        options={[
          { value: "", label: "Все" },
          ...tirs.map((_, index) => ({
            value: String(index + 1),
            label: `Тир: ${index + 1}`,
          })),
        ]}
      />
    </div>
  );
};

export default TirLeagues;
