import { makeAutoObservable, runInAction } from "mobx";

export class User {
  uuid: string | undefined;

  token: string | undefined;

  constructor() {
    makeAutoObservable(this);
    this.initUpdate();
  }

  initUpdate() {
    this.Update({
      token: localStorage.getItem("token") ?? "",
      uuid: localStorage.getItem("uuid") ?? "",
    });
  }

  clear() {
    this.Update({ token: undefined, uuid: undefined });
    localStorage.clear();
  }

  Update(params: Partial<User>) {
    runInAction(() => Object.assign(this, params));
  }
}
