import { FC } from "react";
import styleCss from "./index.module.scss";
import Icons from "@widgets/icons/index";
import { Button, Input } from "antd-mobile";

const Header: FC = () => {
  return (
    <header className={styleCss.module}>
      <div className={styleCss.moduleTop}>
        <Icons
          icon="icon-31fanhui1"
          size={22}
          style={{ fontWeight: "lighter" }}
        />
        <Icons icon="icon-jia" size={22} />
      </div>
      <div className={styleCss.search}>
        <Input className={styleCss.searchInput} placeholder="搜索文件" />
        <Button color="primary" className={styleCss.but}>
          搜素
        </Button>
      </div>
    </header>
  );
};

export default Header;
