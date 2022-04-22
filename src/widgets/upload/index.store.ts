import { Toast } from "antd-mobile";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class UploadStore {
  images: (string | ArrayBuffer | null)[] | undefined;

  videos: string[] | undefined;

  constructor() {
    this.images = [];
    this.videos = [];
    makeAutoObservable(this);
  }

  handleFileChange(
    event: React.MutableRefObject<HTMLInputElement>,
    callback?: Function
  ) {
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
        baseURL: "http://localhost:3003",
        withCredentials: true,
      });

      request.defaults.withCredentials = true;

      request
        .post("/api/upload/images", formData)
        .then(({ data }) => {
          if (data.mgsCode === 200) {
            callback?.(data.body);
            // this.updateData({ images: this.images?.concat(reader.result) });
          }
        })
        .catch((err) => {
          console.log("err is a", err);
        });
    };
  }

  handleUploadVideo(event: React.MutableRefObject<HTMLInputElement>) {
    const data = event.current.files?.[0] as File;

    const reader = new FileReader();

    reader.readAsDataURL(data);

    const formData = new FormData();

    formData.append("videos", data, data.name);

    reader.onload = () => {
      const request = axios.create({
        headers: {
          "Content-Type": "application/json",
        },
        baseURL: "http://localhost:3003",
        withCredentials: true,
      });

      request.defaults.withCredentials = true;

      request
        .post("/api/upload/videos", formData)
        .then(({ data }) => {
          if (data.mgsCode === 200) {
            this.updateData({ videos: this.videos?.concat(data.body) });
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
