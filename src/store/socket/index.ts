import { callApiNotLogin } from "@/api/apiCall";
import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../auth/user";

export class WebSocketMessage {
  url: string | undefined;
  conn: WebSocket | undefined;
  loading: boolean = false;
  data: string = "";
  uuid: string = "";
  status: number = 0;

  constructor(data: { url: string; user: User }) {
    makeAutoObservable(this);
    this.Update({ url: data.url });
    this.init();
    this.data = data.user.token ?? "";
    this.uuid = data.user.uuid ?? "";
    // callApiNotLogin("/api/ws" as any, {
    //   params: undefined,
    //   reqData: undefined,
    //   method: "get",
    // }).then((res: any) => {
    //   if (res.mgsCode === 200) {
    //     this.data = data.user.token || "";
    //     this.init();
    //   }
    // });
  }

  init() {
    this.conn = new WebSocket(this.url || "");
    this.conn.onopen = (events) => {
      if (!this.status) {
        this.onSend();
      }
      const currentTarget = events.currentTarget as WebSocket;
      this.status = currentTarget.readyState;
    };
    this.StepLogin();
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
    this.conn.onmessage = (events) => {
      const currentTarget = events.currentTarget as WebSocket;

      this.status = currentTarget.readyState;

      // if (currentTarget.readyState === 1) {
      //   this.onSend();
      // }
    };
  }

  onSend() {
    if (!this.conn) {
      return console.error("还未创建socket实列");
    }
    this.conn.send(JSON.stringify({ token: this.data, user_id: this.uuid }));
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
