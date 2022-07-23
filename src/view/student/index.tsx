import { observer } from "mobx-react-lite";
import { FC } from "react";
import styleCss from "./index.module.scss";
import Header from "./component/header";

const Student: FC = () => {
  return (
    <div className={styleCss.student}>
      <Header />
    </div>
  );
};

export default observer(Student);
