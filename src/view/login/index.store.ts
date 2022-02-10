import { makeAutoObservable } from "mobx";
import { callApi } from "@/api/apiCall";

export default class LoginStore {
  // 用户账户输入
  account: string | undefined;
  constructor() {
    this.account = ""; 
    makeAutoObservable(this); 
  }

  handleTest() {
    callApi("/login/user/sign", {
      method: "post",
      reqData: { phone: "18719426930", code: "111111" },
      params: undefined,
    });
  }
}
