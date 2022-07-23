import styleCss from "./index.module.scss";
import { FC } from "react";
import Image from "@widgets/image";
import url from "@/assets/images/files.jpeg";

const FileItems: FC = () => {
  return (
    <div className={styleCss.file}>
      <div className={styleCss.leftImg}>
        <Image url={url} />
      </div>
      <div className={styleCss.rightContent}>??</div>
    </div>
  );
};

export default FileItems;
