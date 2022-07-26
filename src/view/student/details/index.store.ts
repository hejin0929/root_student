import { makeAutoObservable } from "mobx";

class DetailsStore {
  url: string | undefined = "1";
  english: string = "this is a english";
  record: MediaRecorder | undefined;
  constructor() {
    makeAutoObservable(this);
  }

  handleRecord() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((res) => {
      let chumks: BlobPart[] = [];

      this.record = new MediaRecorder(res);

      this.record.start();

      this.record.ondataavailable = (e) => {
        chumks.push(e.data);
      };

      this.record.onstop = () => {
        let blob = new Blob(chumks, { type: "audio/webm;codes=opus" });
        let file = new window.File([blob], "record.webm");
        this.url = (window.URL || webkitURL).createObjectURL(blob);
      };
    });
  }

  handleRecordStop() {
    this.record?.stop();
  }
}

export default DetailsStore;
