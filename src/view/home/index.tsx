import { useStore } from "@/store/auth";
import { Button, Input } from "antd-mobile";
import { observer } from "mobx-react-lite";
import HomeStore from "./index.store";
import styleCss from "./index.module.scss";

export default observer(() => {
  const store: HomeStore = useStore(HomeStore);

  return (
    <div className={styleCss.HomeMain}>
      <div className={styleCss.homeHeader}>
        <div className={styleCss.leftBlock}>
          <i
            className="iconfont icon-jia"
            onClick={() => store.handleAddUser()}
          />
        </div>
      </div>
      test {store.routers?.path}
      <div onClick={() => store.handleClick()}>点我跳到管理页</div>
      <Input
        placeholder="接受者ID"
        onChange={(v) => store.updateData({ receive_id: v })}
      />
      <Input
        placeholder="输入发送的消息"
        onChange={(v) => store.updateData({ send: v })}
      />
      <Button onClick={() => store.handleSendWsData()}>点击发送消息</Button>
    </div>
  );
});
