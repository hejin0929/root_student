import IMG from "@/assets/images/LOGIN.jpeg";
import { FC, memo } from "react";
import StyleCss from "./index.module.scss";

const Image: FC<{ url: string }> = memo(({ url }) => {
  return (
    <div className={StyleCss.imageMain}>
      <img src={url || IMG} />
    </div>
  );
});


export default Image;