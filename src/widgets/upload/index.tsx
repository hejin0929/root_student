import { useStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import { FC, useRef } from "react";
import StyleCss from "./index.module.scss";
import UploadStore from "./index.store";

const Upload: FC<{ opacity?: number; onChange?: Function }> = observer(
  ({ opacity, onChange }) => {
    const store: UploadStore = useStore(UploadStore);
    const refs = useRef(null);

    return (
      <div className={StyleCss.upload} style={{ opacity: opacity || 0 }}>
        {/* <ul className={StyleCss.list}>
        {store.images?.map((v, i) => {
          return (
            <li key={i}>
              <img src={String(v)} />
            </li>
          );
        })}
      </ul> */}
        <input
          ref={refs}
          type="file"
          accept="image"
          onChange={() => store.handleFileChange(refs as any, onChange)}
        />

        {/* <UploadVideo /> */}
      </div>
    );
  }
);

const UploadVideo = observer(() => {
  const store: UploadStore = useStore(UploadStore);
  const refs = useRef(null);

  return (
    <div className={StyleCss.videoBox}>
      <ul className={StyleCss.list}>
        {store.videos?.map((v, i) => {
          console.log(v);

          return (
            <li key={i}>
              <video src={v} controls />
            </li>
          );
        })}
      </ul>
      <input
        ref={refs}
        type="file"
        accept="video"
        onChange={() => store.handleUploadVideo(refs as any)}
      />
    </div>
  );
});

export { Upload, UploadVideo };
