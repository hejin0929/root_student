import { useStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import HomeStore from "./index.store";
// import moduleName from '@/'

export default observer(() => {
  const store: HomeStore = useStore(HomeStore)
  return (
    <div>
      test
      <div onClick={() => store.handleClick() }>点我跳到管理页</div>
    </div>
  );
});
