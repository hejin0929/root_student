import { useStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import styleCss from "./index.module.scss";
import NewUserStore from "./index.store";

const NewUser: FC = () => {
  const store: NewUserStore = useStore(NewUserStore);

  return <div className={styleCss.newUser}>123</div>;
};

export default observer(NewUser);
