import { useEffect } from "react";
import { useTypeDispatch } from "../hooks/useTypeDispatch";
import { fetchWallet } from "../modules/Forms/reate-form/components/WalletConvert";
import { setWallet } from "../store/Slices/rateSlice";

const GetAllGeneral = () => {
  const dispatch = useTypeDispatch();

  useEffect(() => {
    fetchWallet().then((res) => {
      dispatch(
        setWallet({
          usd: Number(res.USD),
          eu: Number(res.EURO),
        })
      );
    });
  }, []);

  return <></>;
};

export default GetAllGeneral;
