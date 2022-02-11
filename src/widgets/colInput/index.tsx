import { Input } from "antd-mobile";
import { FC } from "react";
import StyleCss from "./index.module.scss";

const ColInput: FC<{
  value: string;
  updateChange: (v: string) => any;
  name?: string;
}> = (_props) => (
  <div className={StyleCss.col}>
    <div className={StyleCss.leftName}>{_props.name ?? "请输入"}</div>
    <Input
      value={_props.value}
      onChange={(v) => _props.updateChange(v)}
      className={StyleCss.rightValue}
    />
  </div>
);

export default ColInput;
