import { callApi } from "@/api/apiCall";
import { ApiRequstResponse } from "@/api/type";
import { User } from "@/store/auth/user";
import { makeAutoObservable, runInAction } from "mobx";

type Users = ApiRequstResponse<"/api/user/user_message/{id}">;

class AdminStore {
  user: Users | undefined;
  loading: boolean | undefined = false;

  constructor({ user }: { user: User }) {
    makeAutoObservable(this);

    this.init(user.uuid || "");
  }

  async init(uuid: string) {
    const res = await callApi("/api/user/user_message/{id}", {
      params: { id: uuid },
      reqData: undefined,
      method: "get",
    });

    this.update({ user: res, loading: true });
  }

  update(params: Partial<AdminStore>) {
    runInAction(() => Object.assign(this, params));
  }
}

export default AdminStore;
