import { Routers } from "@/store/auth/router";
import { makeAutoObservable, runInAction } from "mobx";

export class AddUser {
  routers: Routers | undefined;
  constructor({ routers }: any) {
    this.update({ routers });
    makeAutoObservable(this);
  }

  update(params: Partial<AddUser>) {
    runInAction(() => Object.assign(this, params));
  }
}
