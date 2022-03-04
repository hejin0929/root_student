import { FC } from "react";
import { observer } from "mobx-react-lite";
import Store, { TestStore } from "./index.store"; // 本页面store
import { useStore } from "@store/auth";
import StyleCss from "./index.module.scss";
import MyForm from "@widgets/myForm";
import Image from "@widgets/image";
import login from "@/assets/images/LOGIN.jpeg";

const Login: FC = () => {
  const store: Store = useStore(Store);

  return (
    <div className={StyleCss.SignBox}>
      <h2 className={StyleCss.signTitle}>
        {store.viewTitleText}{" "}
        <span className={StyleCss.textRight}>new user</span>
      </h2>
      <div className={StyleCss.loginImg}>
        <Image url={login} />
      </div>
      <div className={StyleCss.formMains}>
        <MyForm
          list={store.pageFormLogin}
          onSubmit={(data: any) => store.handleOnSubmit(data)}
          submitTxt={store.viewText}
        />
      </div>
    </div>
  );
};

export default observer(Login);
