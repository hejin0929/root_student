import { useStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import HomeStore from "./index.store";
// import moduleName from '@/'

export default observer(() => {
  const store: HomeStore = useStore(HomeStore)
  console.log("update ?");
  
  return (
    <div>
      test {store.routers?.path}
      <div onClick={() => store.handleClick() }>点我跳到管理页</div>
    </div>
  );
});
