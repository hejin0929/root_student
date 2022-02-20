import { Look } from "@/store/auth";
import { StoreRouter } from "@/store/auth/router";
// import { Routers } from "@/store/auth/router";
import { makeAutoObservable, runInAction } from "mobx";

class HomeStore {
  name: string = "";
  routers: StoreRouter | undefined;
  events: Look | undefined;

  constructor({ events, routers }: { events: Look; routers: StoreRouter }) {
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
