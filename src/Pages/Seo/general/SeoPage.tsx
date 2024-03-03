import { FC, useEffect, useState } from "react";
import SelectOneSport from "../../../modules/Selects/SelectOneSport";
import { FormSport } from "./components/FormSport";
import { FormOther } from "./components/FormOther";
import axios from "../../../core/axios";
import {
  ICreateGeneralSeo,
  ISeo,
} from "../../../store/Slices/seoSlice/interface";
import { Form, Spin } from "antd";
import { notify } from "../../../assets/scripts/notify";
import { defaultSeo } from "./const/defaultSeo";

const fetchGeneralSeo = async (sportId: number) => {
  try {
    const { data } = await axios.get(
      `/get_ceo_for_sport_id?sport_id=${sportId}`
    );
    return data.data;
  } catch (error) {
    return [];
  }
};

const createGeneralSeo = async (sportId: number, values: ICreateGeneralSeo) => {
  const { data } = await axios.post("/create_all_ceo", {
    sport_id: sportId,
    data: values,
  });
  console.log(data);
  return data;
};

export const SeoPage: FC = () => {
  const [loading, setLoading] = useState(false);

  const [sport, setSport] = useState<number>(1);
  const [sportData, setSportData] = useState<null | ISeo>(null);
  const [countryData, setCountryData] = useState<ISeo | null>(null);
  const [leagueData, setLeagueData] = useState<ISeo | null>(null);
  const [matchData, setMatchData] = useState<ISeo | null>(null);

  const onFinish = (values: ICreateGeneralSeo) => {
    setLoading(true);
    createGeneralSeo(sport, values)
      .then(() => {
        notify({
          type: "success",
          message: "Общий Seo текст успешно обновлен",
        });
      })
      .catch(() => {
        notify({
          type: "error",
          message: "Ошибка",
          description: "Попробуйте позже",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchGeneralSeo(sport)
      .then((res: ISeo[]) => {
        const sportData = res.find((item) => item.page === "sports");
        const countryData = res.find((item) => item.page === "country");
        const leagueData = res.find((item) => item.page === "league");
        const matchData = res.find((item) => item.page === "match");

        setSportData(sportData || defaultSeo);
        setCountryData(countryData || defaultSeo);
        setLeagueData(leagueData || defaultSeo);
        setMatchData(matchData || defaultSeo);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sport]);

  console.log(countryData);
  return (
    <div style={{ maxWidth: 700 }}>
      <div className="flex items-center">
        <h1>SEO Общее</h1>
      </div>
      <div className="mt-6">
        <SelectOneSport
          value={sport}
          setValue={setSport}
          className="text-left"
        />
      </div>
      <div className="mt-5">
        <Spin spinning={loading}>
          <Form.Provider
            onFormFinish={(_, info) => {
              const values: ICreateGeneralSeo = {};
              for (const key in info.forms) {
                const form = info.forms[key];
                values[key] = form.getFieldsValue();
              }
              onFinish(values);
            }}
          >
            <FormSport data={sportData} />
            <FormOther data={countryData} title="Страны" page="country" />
            <FormOther data={leagueData} title="Лиги" page="league" />
            <FormOther data={matchData} title="Матчи" page="match" />
          </Form.Provider>
        </Spin>
      </div>
    </div>
  );
};
