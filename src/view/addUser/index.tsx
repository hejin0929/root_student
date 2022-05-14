import { observer } from "mobx-react-lite";
import styleCss from "./index.module.scss";
import { useStore } from "@store/auth";
import { AddUser } from "./index.store";
import { Button, Input } from "antd-mobile";
import Icon from "@widgets/icons";
import Image from "@widgets/image";

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
            onChange={(e) => store.update({ userNum: e, user: undefined })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                store.handleSearchUser();
              }
            }}
          />
          <span
            onClick={() => store.handleSearchUser()}
            className={styleCss.btuIcons}
          >
            <Icon icon="icon-sousuo" />
          </span>
        </div>
      </div>

      {store.user &&
        (store.user?.user_id ? (
          <div className={styleCss.userMessage}>
            <div className={styleCss.headerImg}>
              <Image url={store.user?.image || ""} />
            </div>
            <div className={styleCss.userNameAndIntroduce}>
              <p className={styleCss.userName}>{store.user.name}</p>
              <p className={styleCss.introduce}>
                {store.user.introduce || "暂无介绍"}
              </p>
            </div>
            <div className={styleCss.rigthBtu}>
              <Button
                onClick={() => {
                  // store.addStatus &&
                  store.handleAddUser();
                }}
                color={store.addStatus ? "success" : "default"}
              >
                {store.addStatus ? "添加" : "已发送"}
              </Button>
            </div>
          </div>
        ) : (
          <p className={styleCss.notData}>无此用户</p>
        ))}
    </div>
  );
});
