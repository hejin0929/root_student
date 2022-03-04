import { FC } from "react";
import { observer } from "mobx-react-lite";
import Store, { PageStyle } from "./index.store"; // 本页面store
import { useStore } from "@store/auth";
import StyleCss from "./index.module.scss";
import MyForm from "@widgets/myForm";
import Image from "@widgets/image";
import login from "@/assets/images/LOGIN.jpeg";
import { language } from "@/config/language";

const Login: FC = () => {
  const store: Store = useStore(Store);

  return (
    <div className={StyleCss.SignBox}>
      <h2 className={StyleCss.signTitle}>
        <span
          className={StyleCss.language}
          onClick={() =>
            language.updateNames(
              language.select === "EM_US" ? "ZH_CN" : "EM_US"
            )
          }
        >
          {language.names.systemLanguage}
        </span>
        {store.viewTitleText}{" "}
        <span
          className={StyleCss.textRight}
          onClick={() =>
            store.handleUpdateStyleType(store.pageStyleType === PageStyle.ADD_USER ? PageStyle.PASSWORD_LOGIN : PageStyle.ADD_USER)
          }
        >
          {store.viewTitleLeftText}
        </span>
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
        <div className={StyleCss.loginType} onClick={() => store.handleUpdateStyleType(store.pageStyleType === PageStyle.PASSWORD_LOGIN ? PageStyle.CODE_LOGIN : PageStyle.PASSWORD_LOGIN) }>
          {store.viewLoginType}
        </div>
      </div>
    </div>
  );
};

export default observer(Login);
