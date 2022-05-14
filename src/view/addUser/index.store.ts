import { callApi } from "@/api/apiCall";
import { Routers } from "@/store/auth/router";
import { makeAutoObservable, runInAction } from "mobx";

export class AddUser {
  routers: Routers | undefined;
  id: string = "";
  constructor({ routers }: any) {
    this.update({ routers });
    makeAutoObservable(this);
  }

  async getUserMessage() {
    const res = await callApi("/api/chum/search/{phone}", {
      reqData: undefined,
      params: {
        phone: this.id,
      },
      method: "get",
    });

    if (res.mgsCode === 200) {
      console.log(res.body);
    }
  }

  update(params: Partial<AddUser>) {
    runInAction(() => Object.assign(this, params));
  }
}
