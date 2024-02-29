import { Table as AntTable, Button, Form, Input, InputRef, Space } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { required } from "../../../../core/form-rools";
import { notify } from "../../../../assets/scripts/notify";
import { ColumnType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import AddMacrosTable from "./AddMacrosTable";

interface IJson {
  [key: string]: string;
}

interface IProps {
  json: IJson;
  setData: (json: IJson) => void;
}

export interface IJsonParse {
  key: string;
  macros: string;
  value: string;
}
const jsonParseToTable = (json: IJson): IJsonParse[] => {
  const res: IJsonParse[] = [];
  for (const key in json) {
    res.push({
      key: key,
      macros: key,
      value: json[key],
    });
  }
  return res;
};

const fromTableToJson = (data: IJsonParse[]): IJson => {
  const res: IJson = {};
  data.forEach((item) => {
    res[item.macros] = item.value;
  });
  return res;
};

const Table: FC<IProps> = ({ json, setData }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IJsonParse[]>(
    jsonParseToTable(json)
  );
  const searchInput = useRef<InputRef>(null);

  const [form] = Form.useForm<{ [key: string]: string }>();

  const onChangeValue = (id: string, index: number) => {
    const macros = form.getFieldValue(id + "-macros");
    const value = form.getFieldValue(id + "-value");
    if (currentData.find((item, i) => index !== i && item.macros === macros)) {
      notify({
        type: "error",
        message: `${macros} уже существует`,
      });
      return;
    }

    setCurrentData(
      currentData.map((item) => {
        if (id === item.key) {
          return {
            key: macros,
            macros: macros,
            value: value,
          };
        }
        return item;
      })
    );
    notify({
      type: "success",
      message: `Макрос изменен`,
    });
  };

  type DataIndex = keyof IJsonParse;

  const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => {
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IJsonParse> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  useEffect(() => {
    setData(fromTableToJson(currentData));
  }, [currentData]);

  return (
    <>
      <Form form={form}>
        <Button
          className="ml-auto mb-2 block"
          onClick={() => setIsOpenModal((prev) => !prev)}
        >
          Добавить Макрос
        </Button>
        <AntTable
          scroll={{ y: 400, x: 400 }}
          dataSource={currentData}
          columns={[
            {
              title: "Макрос",
              dataIndex: "macros",
              className: "align-top",
              width: 132,
              rowSpan: 10,
              ...getColumnSearchProps("macros"),
              render: (_, record) => (
                <Form.Item
                  name={record.key + "-macros"}
                  initialValue={record.macros}
                  rules={[required]}
                >
                  <Input className="w-20" />
                </Form.Item>
              ),
            },
            {
              title: "Перевод",
              dataIndex: "value",
              className: "align-top",
              ...getColumnSearchProps("value"),
              render: (_, record) => (
                <Form.Item
                  name={record.key + "-value"}
                  initialValue={record.value}
                  rules={[required]}
                >
                  <TextArea
                    placeholder="Controlled autosize"
                    autoSize={{ minRows: 1, maxRows: 40 }}
                  />
                </Form.Item>
              ),
            },
            {
              dataIndex: "action",
              width: 100,
              className: "!px-0  align-top",
              render: (_, record, index) => (
                <Button onClick={() => onChangeValue(record.key, index)}>
                  Изменить
                </Button>
              ),
            },
          ]}
        />
      </Form>
      <AddMacrosTable
        data={currentData}
        setData={setCurrentData}
        open={isOpenModal}
        setOpen={setIsOpenModal}
      />
    </>
  );
};

export default Table;
