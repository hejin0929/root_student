import { makeAutoObservable, runInAction } from "mobx";
import { callApi } from "@/api/apiCall";
import { Look, useStore } from "@/store/auth";

export default class LoginStore {
  // 用户账户输入
  phone: string | undefined;
  code: string = "";
  isCode: boolean = false;
  isPassword: boolean = false;
  count: number | undefined;
  times: NodeJS.Timeout | undefined;

  get pageStatic() {
    return [
      {
        name: "手机:",
        value: "phone",
      },
      {
        name: "密码:",
        value: "password",
      },
      {
        name: "验证码:",
        value: "code",
      },
    ];
  }

  $$: Look | undefined;

  test: TestStore | undefined;

  constructor({ events: $$ }: { events: Look }) { // $$ 由于改造计划 已变成 { events: {}, router } ...
    this.$$ = $$;
    makeAutoObservable(this);
    console.log("???", $$);

    // this.test =  useStore(TestStore);

    $$?.on("name", (data: string) => {
      this.UpdateData({ isCode: false });
    });

    // this.$$.on(
    //   "name",
    //   (data) => {
    //     console.log("??", data);
    //   },
    //   TestStore
    // );
  }

  handleTest() {
    callApi("/login/user/sign", {
      method: "post",
      reqData: {
        phone: this.phone || "",
        code: this.code,
        password: "123456",
      },
      params: undefined,
    }).then((res) => {
      // res.body
    });
  }

  handleGetCode() {
    if (this.times) {
      clearTimeout(this.times);
    }

    callApi("/login/user/{phone}", {
      params: { phone: this.phone || "" },
      method: "get",
      reqData: undefined,
    }).then((res) => {
      this.UpdateData({ code: res?.code ?? "", isCode: true, count: 60 });
      this.times = setTimeout(() => {
        console.log("???");

        this.UpdateData({ count: this.count && this.count - 1 });
        if (this.count === 0 && this.times) {
          clearTimeout(this.times);
        }
      }, 1000);
    });
  }

  UpdateData(params: Partial<LoginStore>) {
    runInAction(() => {
      Object.assign(this, params);
    });
  }
}

export class TestStore {
  name: string = "";
  $$: Look | undefined;

  constructor($$: Look) {
    this.$$ = $$;
    makeAutoObservable(this);
  }
}
