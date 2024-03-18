import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IMatchRequest } from "../../../types/match";
import { TypeMatch } from "../../../store/Slices/matchesSlice/interface";
import { Image, Spin } from "antd";

const getTeamName = (team: "away_team" | "home_team", game: TypeMatch) => {
  return game[team].translate && game[team].translate.length > 0
    ? game[team].translate[0].translation
    : game[team].team_name;
};

export const columns: ColumnsType<IMatchRequest> = [
  {
    title: "Матч ID",
    dataIndex: "id",
    render: (_, record) => (
      <Link to={`/matches/${record.game.id}`}>{record.game.id}</Link>
    ),
  },
  {
    title: "Команды",
    dataIndex: "game",

    render: (_, record) => {
      const game = record.game;
      return (
        <div className="flex flex-col">
          <p className="flex items-center">
            <Image
              width={20}
              src={`https://admin.aibetguru.com/uploads/${game.home_team.team_id}.png`}
              placeholder={<Spin />}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png";
              }}
            />
            <Link to={`/teams/${game.home_team.id}`} className="ml-1">
              {getTeamName("home_team", game)}
            </Link>
          </p>
          <p className="flex items-center">
            <Image
              width={20}
              src={`https://admin.aibetguru.com/uploads/${game.away_team.team_id}.png`}
              placeholder={<Spin />}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png";
              }}
            />
            <Link to={`/teams/${game.away_team.id}`} className="ml-1">
              {getTeamName("away_team", game)}
            </Link>
          </p>
        </div>
      );
    },
  },
  {
    title: "Пользователь",
    dataIndex: "user",
    render: (_, record) => {
      return (
        <p>{record.user.name || record.user.nickname || record.user.email}</p>
      );
    },
  },
  {
    title: "ID Пользователя",
    dataIndex: "user_id",
  },

  {
    title: "Создано",
    dataIndex: "created_at",
    render: (_, record) => (
      <p>
        {record.created_at && dayjs(record.created_at).format("DD.MM.YYYY")}
      </p>
    ),
  },
  {
    title: "Обновлено",
    dataIndex: "updated_at",
    render: (_, record) => (
      <p>
        {record.updated_at && dayjs(record.updated_at).format("DD.MM.YYYY")}
      </p>
    ),
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Link to={`/matches/${record.game.id}`} type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
        >
          <path
            d="M16.8528 9.98553L17.3169 9.52138L15.9245 8.12893L13.3737 5.57816L11.9813 4.18572L11.5171 4.64987L10.5888 5.57816L2.40664 13.7603C1.97946 14.1875 1.66729 14.7174 1.49477 15.2965L0.0407125 20.242C-0.0619753 20.587 0.0324975 20.9608 0.291271 21.2155C0.550044 21.4701 0.91972 21.5646 1.26475 21.466L6.20609 20.012C6.78525 19.8394 7.31512 19.5273 7.7423 19.1001L15.9245 10.9179L16.8528 9.98553ZM6.57166 16.9026L6.19787 17.835C6.03357 17.9623 5.84874 18.0568 5.65157 18.1184L2.4395 19.0631L3.38423 15.8552C3.44173 15.6539 3.54031 15.4691 3.66765 15.3089L4.60005 14.9351V16.2495C4.60005 16.6109 4.89579 16.9067 5.25725 16.9067H6.57166V16.9026ZM14.8976 1.26528L14.3061 1.86087L13.3778 2.78916L12.9095 3.25331L14.302 4.64576L16.8528 7.19652L18.2452 8.58897L18.7094 8.12482L19.6377 7.19652L20.2332 6.60093C21.2601 5.57406 21.2601 3.91051 20.2332 2.88364L18.619 1.26528C17.5921 0.238398 15.9286 0.238398 14.9017 1.26528H14.8976ZM12.9506 8.1659L7.03581 14.0807C6.78114 14.3354 6.36217 14.3354 6.10751 14.0807C5.85284 13.826 5.85284 13.4071 6.10751 13.1524L12.0223 7.2376C12.277 6.98293 12.696 6.98293 12.9506 7.2376C13.2053 7.49227 13.2053 7.91123 12.9506 8.1659Z"
            fill="#888888"
          />
        </svg>
      </Link>
    ),
  },
];
