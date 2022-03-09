import { useStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import AdminStore from "./index.store";
import styleCss from "./index.module.scss";
import { Upload } from "@widgets/upload";

const Admin: FC = () => {
  const store = useStore(AdminStore);

  return (
    <div className={styleCss.adminPage}>
      <div className={styleCss.adminMyCenter}>
        <Upload />
      </div>
    </div>
  );
};

export default observer(Admin);
