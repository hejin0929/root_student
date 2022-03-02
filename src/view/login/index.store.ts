import { makeAutoObservable, runInAction } from "mobx";
import { callApi, callApiNotLogin } from "@/api/apiCall";
import { Look } from "@/store/auth";
import classNames from "classnames";
import { Toast } from "antd-mobile";
import { MyFormTypes, FormItemTypes } from "@widgets/myForm/index.store";
import { MyFormStore } from "@widgets/myForm/index.store";

enum PageStyle {
  PASSWORD_LOGIN = 1, // 密码登陆
  CODE_LOGIN, // 验证码登陆
  ADD_USER, // 注册
}

interface FormItems extends MyFormTypes {
  isShow: boolean;
}

export default class LoginStore {
  // 用户账户输入
  phone: string | undefined;
  code: string = "";
  password: string = "";
  isCode: boolean = false;
  isPassword: boolean = false;
  count: number | undefined;
  times: NodeJS.Timeout | undefined;
  oldPhone: string[] | undefined = [];
  pageStyleType: PageStyle = 1;
  
  // 获取登陆以及注册表格的验证
  get pageFormLogin(): FormItems[] {
    return [
      {
        name: "手机:",
        value: "phone",
        isShow: true,
        rules: [
          {
            required: true,
            message: "请输入手机号码!!!",
          },
        ],
        type: FormItemTypes.INPUT
      },
      {
        name: "密码:",
        value: "password",
        isShow: true,
        rules: [
          {
            required: true,
            message: "请输入密码!!!",
          },
        ],
        type: FormItemTypes.PASSWORD
      },
      {
        name: "验证码:",
        value: "code",
        isShow: true,
        rules: [
          {
            required: true,
            message: "请输入验证码!!!",
          },
        ],
        type: FormItemTypes.INPUT
      },
    ];
  }

  get viewText() {
    return classNames({
      [this.count + "s"]: this.count && !this.isPassword,
      ["获取验证码"]: !this.isCode && !this.count,
      ["确认密码"]: this.isPassword,
    });
  }

  get viewTitleText() {
    return classNames({
      ["欢迎登陆"]: this.pageStyleType === 1 || this.pageStyleType === 2,
      ["注册用户"]: this.pageStyleType === 3,
    });
  }

  $$: Look | undefined;

  test: TestStore | undefined;

  constructor({ events: $$ }: { events: Look }) {
    // $$ 由于改造计划 已变成 { events: {}, router } ...
    this.$$ = $$;
    makeAutoObservable(this);
    // console.log("???", $$);

    this.$$.on("submit", (data) => {
      console.log("this is ?? ", data);
      
    }, MyFormStore) // MyFormStore 表单提交的触发函数

    this.$$.on("password", (data) => {
      if (data.length > 5) {
        return this.UpdateData({ isPassword: true });
      }
      this.UpdateData({ isPassword: false });
    });

    this.$$.on("phone", (data) => {
      if (data.length > 10) {
        if (this.oldPhone?.includes(data)) {
          return;
        } else {
          this.oldPhone?.push(data);
          this.UpdateData({ isPassword: false, isCode: false });
        }
      }
    });

    // this.test =  useStore(TestStore);

    $$?.on("name", (data: string) => {
      this.UpdateData({ isCode: false });
    });
  }

  handleTest() {
    callApiNotLogin("/login/user/sign", {
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

    callApiNotLogin("/login/user/{phone}", {
      params: { phone: this.phone || "" },
      method: "get",
      reqData: undefined,
    }).then((res) => {
      this.UpdateData({ code: res?.code ?? "", isCode: true, count: 60 });
      this.times = setInterval(() => {
        this.UpdateData({ count: this.count && this.count - 1 });
        if (this.count === 0 && this.times) {
          this.UpdateData({ isCode: false });
          clearTimeout(this.times);
        }
      }, 1000);
    });
  }

  handleAddUser() {
    callApiNotLogin("/login/user/sign", {
      params: undefined,
      method: "post",
      reqData: {
        phone: this.phone || "",
        code: this.code || "",
        password: this.password,
      },
    }).then((res) => {
      Toast.show({ content: "注册成功" });
    });
  }

  handleClickBottom() {
    if (this.viewText === "获取验证码") {
      return this.handleGetCode();
    } else if (this.viewText === "确认密码") {
      return this.handleAddUser();
    }
  }

  UpdateData(params: Partial<LoginStore>) {
    for (let key in params) {
      this.$$?.subscribe(key, params[key as keyof Partial<LoginStore>]);
    }

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
