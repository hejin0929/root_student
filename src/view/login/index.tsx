import { FC } from "react";
import { observer } from "mobx-react-lite";
import Store, { TestStore } from "./index.store"; // 本页面store
import { useStore } from "@store/auth";
import { Button } from "antd-mobile";
import StyleCss from "./index.module.scss";
import MyInput from "@/widgets/colInput";
import MyForm from "@widgets/myForm";

const Login: FC = () => {
  const store: Store = useStore(Store);
  // const test: TestStore = useStore(TestStore);

  return (
    <div className={StyleCss.SignBox}>
      <h2 className={StyleCss.signTitle}>{store.viewTitleText}</h2>
      {store.pageStatic.map((v) => {
        if (!store.isCode && v.value !== "phone") {
          return null;
        }

        return (
          <div key={v.name}>
            <MyInput
              name={v.name}
              updateChange={(vv: string) =>
                store.UpdateData({ [v.value as keyof Store]: vv })
              }
              value={store[v.value as keyof Store] as string}
            />
            <MyForm list={store.pageFormLogin} onSubmit={(data: any) =>  { }} />
          </div>
        );
      })}

      <Button
        style={{ width: "100%" }}
        onClick={() => store.handleClickBottom()}
        color="primary"
      >
        {store.viewText}
      </Button>
      {/* {test.name} */}
    </div>
  );
};

export default observer(Login);
