import { useStore } from "@/store/auth";
import { Button, Form, Input } from "antd-mobile";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { MyFormStore, MyFormTypes, FormItemTypes } from "./index.store";
import { Item } from "./index.item";
import CssStyle from "./index.module.scss";

/**
 *
 * @returns MyForm 项目Form封装组件
 */
const MyForm: FC<{
  list: MyFormTypes[];
  onSubmit?: (data: any) => void;
  submitTxt?: string;
}> = (_props) => {
  const { list, submitTxt = "确认", onSubmit } = _props;

  const store: MyFormStore = useStore(MyFormStore, { onSubmit, list });

  return (
    <div className={CssStyle.formMain}>
      <Form onFinish={(value) => store.handleSubmit(value)}>
        {list.map((v) => {
          switch (v.type) {
            case FormItemTypes.INPUT:
              return (
                <Item v={v} key={v.value}>
                  <Input placeholder={v.placeholder} />
                </Item>
              );

            case FormItemTypes.PASSWORD:
              return (
                <Item v={v} key={v.value}>
                  <Input placeholder={v.placeholder} type={"password"} />
                </Item>
              );

            default:
              break;
          }
        })}
        <Form.Item>
          <Button color="primary" type="submit" size="large">
            {submitTxt}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default observer(MyForm);
