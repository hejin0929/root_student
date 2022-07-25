import { FC } from "react";
import styleCss from "./index.module.scss";
import Icons from "@widgets/icons/index";

const Header: FC = () => {
  return (
    <header className={styleCss.module}>
      <div className={styleCss.moduleTop}>
        <Icons
          icon="icon-31fanhui1"
          size={22}
          style={{ fontWeight: "lighter" }}
          onClick={() => {}}
        />
        <Icons icon="icon-jia" size={22} />
      </div>
    </header>
  );
};

export default Header;
