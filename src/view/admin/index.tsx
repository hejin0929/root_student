import { useStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import AdminStore from "./index.store";
import styleCss from "./index.module.scss";
import { Upload } from "@widgets/upload";
import Loading from "@widgets/loading";
import Images from "@widgets/image";

const Admin: FC = () => {
  const store: AdminStore = useStore(AdminStore);

  return (
    <div className={styleCss.adminPage}>
      <div className={styleCss.HeaderBlock}>
        <div className={styleCss.authContext}>
          <div className={styleCss.userImg}>
            <Images url={store.user?.image || ""} />
          </div>
          <div className={styleCss.userMessage}>
            <strong className={styleCss.userName}>{store.user?.name}</strong>
            <p className={styleCss.userPhone}>{store.user?.phone}</p>
          </div>
        </div>
      </div>
      <div className={styleCss.adminMyCenter}></div>
      {store.loading ?? <Loading text="数据请求中..." />}
    </div>
  );
};

export default observer(Admin);
