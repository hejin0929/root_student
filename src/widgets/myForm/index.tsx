import { useStore } from "@/store/auth";
import { Form, Input } from "antd-mobile";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { MyFormStore, MyFormTypes, FormItemTypes } from "./index.store";
import { Item } from "./index.item";

/**
 *
 * @returns MyForm 项目Form封装组件
 */
const MyForm: FC<{
  list: MyFormTypes[];
  onSubmit: (data: keyof MyFormTypes[]) => {};
}> = (_props) => {
  const { list } = _props;

  const store: MyFormStore = useStore(MyFormStore, list);

  const { data } = store;

  return (
    <div>
      <Form onFinish={(value) => store.handleSubmit(value)}>
        {list.map((v) => {
          switch (v.type) {
            case FormItemTypes.INPUT:
              return (
                <Item v={v}>
                  <Input placeholder={v.placeholder} />
                </Item>
              );

            case FormItemTypes.PASSWORD:
              return (
                <Item v={v}>
                  <Input placeholder={v.placeholder} type={"password"} />
                </Item>
              );

            default:
              break;
          }
        })}
      </Form>
    </div>
  );
};

export default observer(MyForm);
