import { Look } from "@/store/auth";
import { Routers } from "@/store/auth/router";
import { User } from "@/store/auth/user";
import { WebSocketMessage } from "@/store/socket";
import { makeAutoObservable, runInAction } from "mobx";

class HomeStore {
  name: string = "";
  routers: Routers | undefined;
  events: Look | undefined;
  user: User | undefined;
  ws: WebSocketMessage | undefined;
  send = "";
  receive_id = "";

  constructor({
    events,
    routers,
    user,
  }: {
    events: Look;
    routers: Routers;
    user: User;
  }) {
    this.updateData({ routers, events, user });
    makeAutoObservable(this);
    this.ws = new WebSocketMessage({
      // url: "ws://127.0.0.1:10215/ws",
      url: "ws://127.0.0.1:8081/api/ws",
      user: this.user!,
    });
  }

  handleClick() {
    this.routers?.navigate("/admin");
  }

  handleSendWsData() {
    this.ws?.onSend({
      receive_id: this.receive_id,
      message: this.send,
    });
  }

  handleAddUser() {
    this.routers?.navigate("/add_user");
  }

  updateData(params: Partial<HomeStore>): void {
    runInAction(() => {
      Object.assign(this, params);
    });
  }
}

export default HomeStore;
