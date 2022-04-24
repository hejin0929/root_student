import { useStore, unStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import AdminStore from "./index.store";
import styleCss from "./index.module.scss";
import { Upload } from "@widgets/upload";
import Loading from "@widgets/loading";
import Images from "@widgets/image";
import Icons from "@/widgets/icons";

const Admin: FC = () => {
  const store: AdminStore = useStore(AdminStore);

  unStore(AdminStore);

  return (
    <div className={styleCss.adminPage}>
      <div className={styleCss.HeaderBlock}>
        <div className={styleCss.authContext}>
          <div className={styleCss.userImg}>
            <div className={styleCss.img}>
              <Images url={store.user?.image || ""} />
            </div>
            <div className={styleCss.SetImg}>
              <Icons icon="icon-xiugai" />
              <div className={styleCss.setUpload}>
                <Upload />
              </div>
            </div>
          </div>
          <div className={styleCss.userMessage}>
            <strong className={styleCss.userName}>{store.user?.name}</strong>
            <p className={styleCss.userPhone}>{store.user?.phone}</p>
          </div>
        </div>
      </div>
      <div className={styleCss.adminMyCenter}></div>
      {store.loading ?? <Loading text="数据请求中..." />}

      <div onClick={() => store.update({ num: (store.num || 0) + 1 })}>
        点我加一{store.num}
      </div>
    </div>
  );
};

export default observer(Admin);
