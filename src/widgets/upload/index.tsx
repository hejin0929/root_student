import { useStore } from "@/store/auth";
import { FC, useRef } from "react";
import StyleCss from "./index.module.scss";
import UploadStore from "./index.store";

const Upload:FC = () => {
    const store =  useStore(UploadStore)
    const refs = useRef(null)
    return <div className={StyleCss.upload}>
        <input ref={refs} type="file" accept="image" onChange={()=> store.handleFileChange(refs) } />
    </div>
}

export default Upload;