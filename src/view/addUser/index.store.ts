import { callApi } from "@/api/apiCall";
import { Routers } from "@/store/auth/router";
import { makeAutoObservable, runInAction } from "mobx";
import { ApiRequstResponse } from "@/api/type";
import { Toast } from "antd-mobile";
import { User } from "@store/auth/user";

type NewUser = ApiRequstResponse<"/api/chum/search/{phone}">["body"]["user"];

export class AddUser {
  routers: Routers | undefined;

  userNum: string = "";

  user: NewUser | undefined;

  addStatus: boolean = true;

  myAuth: User | undefined;

  source: number = 0;

  constructor({ routers, user }: any) {
    this.update({ routers, myAuth: user });
    console.log(user);

    makeAutoObservable(this);
  }

  async handleSearchUser() {
    const res = await callApi("/api/chum/search/{phone}", {
      params: {
        phone: this.userNum,
      },
      reqData: undefined,
      method: "get",
    });

    if (res.mgsCode === 200) {
      this.update({ user: res.body.user, source: res.body.source });
    }
  }

  async handleAddUser() {
    const res = await callApi("/api/chum/add", {
      params: undefined,
      method: "post",
      reqData: {
        uuid: this.myAuth?.uuid || "",
        friend_id: this.user?.user_id || "",
        source: this.source,
        permissions: "",
      },
    });

    if (res.mgsCode === 200) {
      Toast.show({
        content: res.body || "",
      });
      this.update({
        addStatus: false,
      });
    }
  }

  update(params: Partial<AddUser>) {
    runInAction(() => Object.assign(this, params));
  }
}
