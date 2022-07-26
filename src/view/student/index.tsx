import { observer } from "mobx-react-lite";
import { FC } from "react";
import styleCss from "./index.module.scss";
import Header from "./component/header";
import Items from "./component/lists";

const Student: FC = () => {
  return (
    <div className={styleCss.student}>
      <Header />
      <div className={styleCss.lists}>
        <Items />
      </div>
    </div>
  );
};

export default observer(Student);
