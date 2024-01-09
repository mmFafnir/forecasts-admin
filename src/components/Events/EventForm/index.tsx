import { FC, useEffect } from "react";
import { Flex, Row } from "antd";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchEvents } from "../../../store/Slices/eventsSlice/asyncActions";
import { fetchRisks } from "../../../store/Slices/risksSlice/asyncActions";
import EventFormItem from "./EventFormItem";
import { TypeMatchEventCard } from "../../../store/Slices/matchesSlice/interface";

interface IState {
  cards: TypeMatchEventCard[];
}

const EventForm: FC<IState> = ({ cards }) => {
  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(fetchEvents({}));
    dispatch(fetchRisks());
  }, []);

  return (
    <div className="mt-8" style={{ maxWidth: "1000px" }}>
      <Row align={"middle"} className="mb-5">
        <h3 className="mr-4">События </h3>
      </Row>
      <Flex wrap="wrap" gap={20}>
        {/* <EventFormCreate /> */}
        {cards.map((event) => (
          <EventFormItem key={event.id} data={event} />
        ))}
      </Flex>
    </div>
  );
};

export default EventForm;
