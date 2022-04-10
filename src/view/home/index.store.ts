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
      url: "ws://127.0.0.1:10215/ws",
      user: this.user!,
    });
  }

  handleClick() {
    this.routers?.navigate("/admin");
  }

  updateData(params: Partial<HomeStore>): void {
    runInAction(() => {
      Object.assign(this, params);
    });
  }
}

export default HomeStore;
