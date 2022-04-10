import { makeAutoObservable, runInAction } from "mobx";

export class WebSocketMessage {
  url: string | undefined;
  conn: WebSocket | undefined;
  loading: boolean = false;
  data: string = "";
  status: number = 0;

  constructor(data: { url: string }) {
    makeAutoObservable(this);
    this.Update({ url: data.url });
    this.init();
  }

  init() {
    this.conn = new WebSocket(this.url || "");
  }

  StepLogin() {
    this.onMeassge();
  }

  watchState() {
    if (this.status === 3) {
      this.onClose();
    }
  }

  onMeassge() {
    if (!this.conn) {
      return console.error("还未创建socket实列");
    }
    this.conn.onmessage = (evet) => {
      console.log("this is a ?? ", evet);
    };
  }

  onSend() {
    if (!this.conn) {
      return console.error("还未创建socket实列");
    }
    this.conn.send(this.data);
  }

  onClose() {
    this.conn?.close();
    this.loading = false;
  }

  Heartbeat() {}

  Update(params: Partial<WebSocketMessage>) {
    runInAction(() => Object.assign(this, params));
  }
}
