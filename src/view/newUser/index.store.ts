import { callApi } from "@/api/apiCall";
import { ApiRequstResponse } from "@/api/type";
import { Look } from "@/store/auth";
import { Routers } from "@/store/auth/router";
import { User } from "@/store/auth/user";
import { makeAutoObservable, runInAction } from "mobx";

type NewUser = ApiRequstResponse<"/api/chum/apply">["body"];

class NewUserStore {
  user: User | undefined;
  list: NewUser;
  constructor({
    events,
    routers,
    user,
  }: {
    events: Look;
    routers: Routers;
    user: User;
  }) {
    this.update({ user });
    makeAutoObservable(this);
    this.getUserApply();
  }

  async getUserApply() {
    const res = await callApi("/api/chum/apply", {
      params: {
        id: this.user?.uuid || "",
      },
      reqData: undefined,
      method: "get",
    });

    if (res.mgsCode === 200) {
      this.list = res.body;
    }
  }

  update(params: Partial<NewUserStore>): void {
    runInAction(() => {
      Object.assign(this, params);
    });
  }
}

export default NewUserStore;
