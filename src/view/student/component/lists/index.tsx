import styleCss from "./index.module.scss";
import { FC } from "react";
import Image from "@widgets/image";
import url from "@/assets/images/files.jpeg";
import Stores from "../../index.store";
import { useStore } from "@/store/auth/index";

const FileItems: FC = () => {
  const store: Stores = useStore(Stores);
  return (
    <div className={styleCss.file}>
      <div className={styleCss.leftImg}>
        <Image url={url} />
      </div>
      <div
        className={styleCss.rightContent}
        onClick={() => store.handleItems()}
      >
        <p className={styleCss.filesName}>文件夹</p>
        <span>{new Date().getTime()}</span>
      </div>
    </div>
  );
};

export default FileItems;
