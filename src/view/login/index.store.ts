import { makeAutoObservable, runInAction } from "mobx";
import { callApi, callApiNotLogin } from "@/api/apiCall";
import { Look } from "@/store/auth";
import classNames from "classnames";
// import { Toast } from "antd-mobile";
import { MyFormTypes, FormItemTypes } from "@widgets/myForm/index.store";
import { language } from "@/config/language";

export enum PageStyle {
  PASSWORD_LOGIN = 1, // 密码登陆
  CODE_LOGIN, // 验证码登陆
  ADD_USER, // 注册
  GET_CODE,
}

interface FormItems extends MyFormTypes {
  isShow: boolean;
}

export default class LoginStore {
  // 用户账户输入
  isCode: boolean = false;
  isPassword: boolean = false;
  count: number | undefined;
  times: NodeJS.Timeout | undefined;
  oldPhone: string[] | undefined = [];
  pageStyleType: PageStyle = 1;

  formList: FormItems[] = [
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
      type: FormItemTypes.INPUT,
    },
    {
      name: "验证码:",
      value: "code",
      isShow: false,
      rules: [
        {
          required: true,
          message: "请输入验证码!!!",
        },
      ],
      type: FormItemTypes.INPUT,
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
      type: FormItemTypes.PASSWORD,
    },
  ];

  // 获取登陆以及注册表格的验证
  get pageFormLogin(): FormItems[] {
    return this.formList.filter((v) => v.isShow);
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
      [language.names.logo]:
        this.pageStyleType === 1 || this.pageStyleType === 2,
      [language.names.user]: this.pageStyleType === 3,
    });
  }

  get viewTitleLeftText() {
    return classNames({
      [language.names.newUser]:
        this.pageStyleType === 1 || this.pageStyleType === 2,
      [language.names.login]: this.pageStyleType === 3,
    });
  }

  get viewLoginType() {
    return classNames({
      [language.names.codeLogin]:
        this.pageStyleType === PageStyle.PASSWORD_LOGIN,
      [language.names.passwordLogin]:
        this.pageStyleType === PageStyle.CODE_LOGIN,
    });
  }

  $$: Look | undefined;

  test: TestStore | undefined;

  constructor({ events: $$ }: { events: Look }) {
    // $$ 由于改造计划 已变成 { events: {}, router } ...
    this.$$ = $$;
    makeAutoObservable(this);

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

  handleGetCode(phone: string) {
    if (this.times) {
      clearTimeout(this.times);
    }

    callApiNotLogin("/login/user/{phone}", {
      params: { phone: phone || "" },
      method: "get",
      reqData: undefined,
    }).then((res) => {
      this.formList.forEach((v) => {
        if (v.value === "code") {
          v.default = res.code;
        }
      });
      this.UpdateData({ isCode: true, count: 60 });

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
    // callApiNotLogin("/login/user/sign", {
    //   params: undefined,
    //   method: "post",
    //   reqData: {
    //     phone: this.phone || "",
    //     code: this.code || "",
    //     password: this.password,
    //   },
    // }).then((res) => {
    //   Toast.show({ content: "注册成功" });
    // });
  }

  // handleClickBottom() {
  //   if (this.viewText === "获取验证码") {
  //     return this.handleGetCode();
  //   } else if (this.viewText === "确认密码") {
  //     return this.handleAddUser();
  //   }
  // }

  // 点击表单提交触发的函数
  handleOnSubmit(data: any) {
    console.log("this is submit ?? ", data);
  }

  // 页面右上角点击时间
  handleUpdateStyleType(types: PageStyle) {
    this.formList.forEach((v) => (v.isShow = true));
    switch (types) {
      case PageStyle.PASSWORD_LOGIN:
        this.formList[2].isShow = false;
        break;
      case PageStyle.CODE_LOGIN:
        this.formList[1].isShow = false;
        break;
      case PageStyle.GET_CODE:
        this.formList[1].isShow = false;
        this.formList[2].isShow = false;
        break;
      default:
        break;
    }
    this.UpdateData({ pageStyleType: types });
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
