import { FC } from "react";
import { observer } from "mobx-react-lite";
import Header from "./components/header";
import styleCss from "./index.module.scss";
import { Button } from "antd-mobile";
import { useStore } from "@store/auth/index";
import Store from "./index.store";

const Details: FC = () => {
  const store: Store = useStore(Store);

  return (
    <div>
      <Header />
      <div className={styleCss.studyShow}>
        <p className={styleCss.studyText}>{store.english}</p>

        {store.url && (
          <div className={styleCss.playerItems}>
            {" "}
            <audio src={store.url} controls></audio>{" "}
            <Button color="danger" className={styleCss.deleteItems}>
              删除
            </Button>
          </div>
        )}
        <div className={styleCss.record}>
          <Button
            color="success"
            onClick={() => store.handleRecordStop()}
            className={styleCss.stop}
          >
            完成
          </Button>
          <Button
            color="primary"
            onClick={() => store.handleRecord()}
            className={styleCss.start}
          >
            录音
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Details);
