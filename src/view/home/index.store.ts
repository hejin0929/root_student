import { Look } from "@/store/auth";
import { Routers } from "@/store/auth/router";
import { makeAutoObservable, runInAction } from "mobx";

class HomeStore {
  name: string = "";
  routers: Routers | undefined;
  events: Look | undefined;

  constructor({ events, routers }: { events: Look; routers: Routers }) {
    this.updateData({ routers, events });
    makeAutoObservable(this);
  }

  handleClick() {
    console.log("???? --->> ");
    this.routers?.navigate("/admin");
  }

  updateData(params: Partial<HomeStore>): void {
    runInAction(() => {
      Object.assign(this, params);
    });
  }
}

export default HomeStore;
