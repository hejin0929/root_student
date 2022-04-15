import { useStore } from "@/store/auth";
import { Button, Input } from "antd-mobile";
import { observer } from "mobx-react-lite";
import HomeStore from "./index.store";
// import moduleName from '@/'

export default observer(() => {
  const store: HomeStore = useStore(HomeStore);

  return (
    <div>
      test {store.routers?.path}
      <div onClick={() => store.handleClick()}>点我跳到管理页</div>
      <Input onChange={(v) => store.updateData({ send: v })} />
      <Button onClick={() => store.handleSendWsData()}>点击发送消息</Button>
    </div>
  );
});
