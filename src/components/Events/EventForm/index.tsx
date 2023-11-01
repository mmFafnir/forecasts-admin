import { FC, useState } from "react";
import EventFormItem from "./EventFormItem";
import { Button, Flex, Row } from "antd";

export type TEventFormItem = {
  id: string;
  name: string;
  coefficient: string | number;
  event: string;
  risk: string;
  best_bet: boolean;
  text: string;
};

const EventForm: FC = () => {
  const [events, setEvents] = useState<TEventFormItem[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  const onAddEvent = (event: TEventFormItem) => {
    setEvents((prev) => [event, ...prev]);
    setTrigger(false);
  };

  const onEditEvent = (newEvent: TEventFormItem) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === newEvent.id ? newEvent : event))
    );
  };

  const onDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <div className="mt-8" style={{ maxWidth: "1041px" }}>
      <Row align={"middle"} className="mb-5">
        <h3 className="mr-4">События </h3>
        <Button onClick={() => setTrigger(true)} type="primary">
          Добавить событие
        </Button>
      </Row>
      <Flex wrap="wrap" gap={20}>
        <EventFormItem
          setTrigger={setTrigger}
          type="adding"
          setEvent={onAddEvent}
          trigger={trigger}
        />
        {events.map((event) => (
          <EventFormItem
            type="editor"
            setEvent={onEditEvent}
            onDelete={onDeleteEvent}
            trigger={trigger}
            key={event.id}
            event={event}
          />
        ))}
      </Flex>
    </div>
  );
};

export default EventForm;
