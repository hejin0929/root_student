import { Toast } from "antd-mobile";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class UploadStore {
  images: (string | ArrayBuffer | null)[] | undefined;

  constructor() {
    this.images = [];
    makeAutoObservable(this);
  }

  handleFileChange(event: React.MutableRefObject<HTMLInputElement>) {
    const data = event.current.files?.[0] as File;
    const reader = new FileReader();

    reader.readAsDataURL(data);

    reader.onload = () => {
      if (this.images?.includes(reader.result))
        return Toast.show({ content: "图片已存在!" });

      const formData = new FormData();

      formData.append("image", data, data.name);

      const request = axios.create({
        headers: {
          "Content-Type": "application/json",
        },
        baseURL: "http://localhost:3001",
        withCredentials: true,
      });

      request.defaults.withCredentials = true;

      request
        .post("/api/upload/images", formData)
        .then(({ data }) => {
          if (data.mgsCode === 200) {
            this.updateData({ images: this.images?.concat(reader.result) });
          }
        })
        .catch((err) => {
          console.log("err is a", err);
        });
    };
  }

  updateData(params: Partial<UploadStore>) {
    runInAction(() => Object.assign(this, params));
  }
}

export default UploadStore;
