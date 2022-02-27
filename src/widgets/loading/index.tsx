import { FC } from "react";
import { observer } from "mobx-react-lite";
import StyleCss from "./index.module.scss";
import { SpinLoading } from "antd-mobile";

const Loading: FC<{ text?: string; iconSize?: string | number }> = ({
  text = "加载中...",
  iconSize = "48px",
}) => {
  return (
    <div className={StyleCss.LoadingBox}>
      <SpinLoading
        style={{
          "--size": iconSize.toString().includes("px")
            ? (iconSize as string)
            : String(iconSize) + "px",
        }}
      />
      <span>{text}</span>
    </div>
  );
};

export default observer(Loading);
