import { FC, useState } from "react";
import { columns } from "../Forms/LeagueForm/column";
import { ITranslateLeague } from "../../store/Slices/leaguesSlice/interface";
import { Button, Form, Table } from "antd";
import { updateTranslate } from "./actions";

interface IProps {
  translate: ITranslateLeague[];
}

const TableTranslate: FC<IProps> = ({ translate }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const update = (id: number) => {
    setLoading(true);
    const value = form.getFieldValue(id);
    updateTranslate({
      trans_id: id,
      translation: value,
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Form form={form} style={{ maxWidth: "700px" }}>
      <Table
        rowKey={"lang_id"}
        loading={loading}
        dataSource={translate}
        columns={columns.map((col) => {
          if (col.key == "action") {
            col.align = "right";
            col.width = 100;
            col.render = (_, record) => (
              <Button
                type="primary"
                style={{ height: 32 }}
                onClick={() => update(record.id)}
              >
                Изменить
              </Button>
            );
          }
          return col;
        })}
        pagination={translate.length < 8 ? false : undefined}
      />
    </Form>
  );
};

export default TableTranslate;
