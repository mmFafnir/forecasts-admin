import { DataType } from ".";

const data: DataType[] = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: `${i}`,
    country: "Europe",
    league: "UEFA Champions League Qualifying",
    season: "23/24",
    date: "15.10.2023",
    time: "15:21",
    team_home: "Borussia Dortmund",
    team_away: "Real Madrid",
    update: "2023-10-23 16:00:46",
    user: "Amidamaru",
    status:
      i % 2 ? (
        <p style={{ color: "green" }}>опубликовано</p>
      ) : (
        <p style={{ color: "red" }}>на модерации</p>
      ),
  });
}

export default data;
