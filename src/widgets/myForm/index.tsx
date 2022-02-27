import { Form, Input } from "antd-mobile";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { MyFormTypes } from "./index.store";

/**
 *
 * @returns MyForm 项目Form封装组件
 */
const MyForm: FC<{list: MyFormTypes[], onSubmit: (data: keyof MyFormTypes[])=> {} }> = (_props) => {

    const { list } = _props

    
   
  return (
    <div>
      <Form>
          {list.map( v => {
              switch (v.type) {
                  case 1:
                      
                      return <Form.Item key={v.value}>
                          <Input  placeholder={v.placeholder} />
                      </Form.Item>
              
                  default:
                      break;
              }
          })}
      </Form>
    </div>
  );
};

export default observer(MyForm);
