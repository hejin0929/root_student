import { FC } from "react";
import styleCss from "./index.module.scss";

const FeatureModule: FC<{
  name?: string;
  icon?: string;
  onClick?: (id?: string) => void;
  iconSize?: string | number;
}> = ({ name = "模块化", icon = "icon-jia", onClick, iconSize = 22 }) => {
  return (
    <div
      className={styleCss.module}
      onClick={() => setTimeout(() => onClick?.(name), 200)}
    >
      <div className={styleCss.name}>{name}</div>
      <i
        className={"iconfont " + icon}
        style={{
          fontSize: iconSize.toString().includes("px")
            ? iconSize
            : iconSize + "px",
        }}
      />
    </div>
  );
};

export default FeatureModule;
