import { FC } from "react";
import TableEvents from "../components/Tables/TableEvents";

const EventsPage: FC = () => {
  return (
    <>
      <div className="flex items-center">
        <h1>События</h1>
      </div>

      <TableEvents />
    </>
  );
};

export default EventsPage;
