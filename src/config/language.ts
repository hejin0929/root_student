import { makeAutoObservable, runInAction } from "mobx";
import EM_US from "@/assets/language/em_us.json";
import ZH_CN from "@/assets/language/zh_cn.json";

class LanguageStore {
  select = "ZH_CN";

  constructor() {
    makeAutoObservable(this);
  }

  // 获取
  get selectList() {
    if (this.select === "ZH_CN") {
      return [
        {
          name: "中文",
          value: "ZH_CN",
        },
        {
          name: "英文",
          value: "EM_US",
        },
      ];
    }
    return [
      {
        name: "Chinese",
        value: "ZH_CN",
      },
      {
        name: "English",
        value: "EM_US",
      },
    ];
  }

  updateNames(value: "ZH_CN" | "EM_US") {
    this.select = value;
  }

  get names() {
    if (this.select === "ZH_CN") {
      return JSON.parse(JSON.stringify(ZH_CN));
    }
    return JSON.parse(JSON.stringify(EM_US));
  }
}

const language = new LanguageStore();

export { language };
