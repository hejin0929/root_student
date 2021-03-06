import { observer } from "mobx-react-lite";
import { createContext } from "react";
import { CreateStore } from "./auth";

// 倒出context
const ContextStore = createContext(new CreateStore());

const renderContext = observer((_props) => {
  return (
    <ContextStore.Provider value={new CreateStore()}>
      {" "}
      {_props.children}{" "}
    </ContextStore.Provider>
  );
});

export { ContextStore };

export default renderContext;
