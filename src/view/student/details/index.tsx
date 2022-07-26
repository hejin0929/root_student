import { FC } from "react";
import { observer } from "mobx-react-lite";
import Header from "./components/header";
import styleCss from "./index.module.scss";

const Details: FC = () => {
  return (
    <div>
      <Header />
      <div className={styleCss.studyShow}>
        <p className={styleCss.studyText}></p>
      </div>
    </div>
  );
};

export default observer(Details);
