import React, { useEffect } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const SelectCountries: React.FC = () => {
  useEffect(() => {}, []);
  return (
    <Select
      mode="tags"
      style={{ width: "100%" }}
      onChange={handleChange}
      autoClearSearchValue={false}
      tokenSeparators={[","]}
      options={options}
    />
  );
};

export default SelectCountries;
