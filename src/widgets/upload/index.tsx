import { useStore } from "@/store/auth";
import { observer } from "mobx-react-lite";
import { FC, useRef } from "react";
import StyleCss from "./index.module.scss";
import UploadStore from "./index.store";

const Upload: FC = observer(() => {
  const store: UploadStore = useStore(UploadStore);
  const refs = useRef(null);

  return (
    <div className={StyleCss.upload}>
      <ul className={StyleCss.list}>
        {store.images?.map((v, i) => {
          return (
            <li key={i}>
              <img src={String(v)} />
            </li>
          );
        })}
      </ul>
      <input
        ref={refs}
        type="file"
        accept="image"
        onChange={() => store.handleFileChange(refs as any)}
      />
    </div>
  );
});


const UploadVideo = observer(() => {
    return <div>
        
    </div>
})



export { Upload };
