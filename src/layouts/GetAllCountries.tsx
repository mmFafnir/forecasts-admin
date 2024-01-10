import { useEffect } from "react";
import { useTypeDispatch } from "../hooks/useTypeDispatch";
import { fetchCountries } from "../store/Slices/countriesSlice/asyncActions";

const GetAllCountries = () => {
  const dispatch = useTypeDispatch();
  useEffect(() => {
    dispatch(fetchCountries({ search: "", limit: "", page: 0 }));
  }, []);

  return <></>;
};

export default GetAllCountries;
