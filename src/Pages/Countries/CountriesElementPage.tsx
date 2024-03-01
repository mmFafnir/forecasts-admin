import axios from "../../core/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypeCountry } from "../../store/Slices/countriesSlice/interface";
import { Space, Spin } from "antd";
import CustomImage from "../../components/UI/CustomImage";
import UpdateCountry from "../../modules/Forms/country-form/UpdateCountry";

const CountriesElementPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState<TypeCountry | null>(null);

  const fetchSingleCountry = async () => {
    try {
      const { data } = await axios.get(`/single_page_country?country_id=${id}`);
      setCountry(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleCountry();
  }, []);

  return (
    <div className="form">
      <div className="flex items-center mb-5 ">
        <CustomImage
          classes={"!w-5 !h-5"}
          rootClasses="!w-5 !h-5"
          src={`https://admin.aibetguru.com/uploads/${country?.id}.svg`}
          errorSrc="https://cdn-icons-png.flaticon.com/512/921/921490.png"
        />
        <h1 className="ml-2">
          {country ? country.translation || country.name : ""}
        </h1>
      </div>
      {!country ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <UpdateCountry id={country.id} leagues={country.league || []} />
      )}
    </div>
  );
};

export default CountriesElementPage;
