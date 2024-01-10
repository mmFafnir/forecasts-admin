import { useEffect } from "react";
import { useTypeDispatch } from "../hooks/useTypeDispatch";
import { fetchSports } from "../store/Slices/sportSlice/asyncAction";

const GetAllSports = () => {
  const dispatch = useTypeDispatch();
  useEffect(() => {
    dispatch(fetchSports());
  }, []);

  return <></>;
};

export default GetAllSports;
