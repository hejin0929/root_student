import { observer } from "mobx-react-lite";
import styleCss from "./index.module.scss";
import { useStore } from "@store/auth";
import { AddUser } from "./index.store";
import { Input } from "antd-mobile";
import Icon from "@widgets/icons";

export default observer(() => {
  const store: AddUser = useStore(AddUser);

  return (
    <div className={styleCss.addUserBox}>
      <div className={styleCss.userHeader}>
        <div className={styleCss.leftIcon}>
          <Icon
            icon="icon-31fanhui1"
            onClick={() => store.routers?.navigate("/home/1")}
          />
        </div>
        <span className={styleCss.HeaderContext}>添加朋友</span>
      </div>
      <div className={styleCss.content}>
        <div className={styleCss.searchBox}>
          <Input
            placeholder="输入查找ID 或 手机号"
            onChange={(event) => store.update({ id: event })}
          />
          <span
            className={styleCss.btuIcons}
            onClick={() => store.getUserMessage()}
          >
            <Icon icon="icon-sousuo" />
          </span>
        </div>
      </div>
    </div>
  );
});
