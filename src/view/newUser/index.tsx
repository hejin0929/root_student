import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import styleCss from "./index.module.scss";
import NewUserStore from "./index.store";

const NewUser: FC = () => {
  // const store: NewUserStore = useState(NewUserStore);

  return <div className={styleCss.newUser}></div>;
};

export default observer(NewUser);
