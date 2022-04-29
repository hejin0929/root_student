import { callApi } from "@/api/apiCall";
import { ApiRequstResponse } from "@/api/type";
import { User } from "@/store/auth/user";
import { Toast } from "antd-mobile";
import { makeAutoObservable, runInAction } from "mobx";

type Users = ApiRequstResponse<"/api/user/user_message/{id}">["body"];

class AdminStore {
  user: Users | undefined;
  loading: boolean | undefined = false;
  num: number | undefined;

  constructor({ user }: { user: User }) {
    this.update({ num: 0 });
    this.init(user.uuid || "");
    makeAutoObservable(this);
  }

  async init(uuid: string) {
    const res = await callApi("/api/user/user_message/{id}", {
      params: { id: uuid },
      reqData: undefined,
      method: "get",
    });

    this.update({ user: res.body, loading: true });
  }

  async handleSwitchImgs(url: string) {
    if (!this.user) {
      return;
    }

    this.user.image = url;

    const res = await callApi("/api/user/user_message/update", {
      method: "post",
      params: undefined,
      reqData: this.user,
    });
    Toast.show({ content: res.body?.res });

    // callApi("/api/user/user_message/update", {}).then(res => {
    //   res.message.
    // })
  }

  update(params: Partial<AdminStore>) {
    runInAction(() => Object.assign(this, params));
  }
}

export default AdminStore;
