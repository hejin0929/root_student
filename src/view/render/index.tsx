import { useStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef } from "react";
import StyleCss from "./index.module.scss";
import RenderStore from "./index.store";

const Render: FC = () => {
  const store: RenderStore = useStore(RenderStore);
  const ref = useRef(null);

  useEffect(() => {
    store.render(ref);
  }, []);

  return (
    <div className={StyleCss.rootRender}>
      <canvas
        id="application-canvas"
        ref={ref}
        className={StyleCss.rootCanvas}
      ></canvas>
    </div>
  );
};

export default observer(Render);
