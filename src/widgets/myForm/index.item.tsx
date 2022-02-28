import { Form } from "antd-mobile";
import { FC, ReactNode } from "react";
import { MyFormTypes } from "./index.store";

export const Item: FC<{ v: MyFormTypes; children: ReactNode }> = ({
  v,
  children,
}) => {
  return (
    <Form.Item
      key={v.value}
      name={v.value}
      label={v.name}
      rules={v.rules}
    >
      {children}
    </Form.Item>
  );
};
