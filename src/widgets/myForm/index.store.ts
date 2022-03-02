import { Look } from "@/store/auth";
import { makeAutoObservable, runInAction } from "mobx";

export type MyFormTypes = {
  name: string;
  value: string;
  default?: string | boolean | number;
  type?: FormItemTypes;
  selectorItem?: {
    name: string;
    value: string;
  }[];
  numberMax?: number;
  numberMin?: number;
  showPassWord?: boolean;
  datePickerTypes?: string;
  placeholder?: string;
  rules?: {required?: boolean; message: string}[]
};

export enum FormItemTypes {
  INPUT = 1, // 普通输入框
  SELECTOR, // 选择输入框
  PASSWORD, // 密码输入框
  NUMBER, // 数字输入框
  INPUT_TEXT, // 文本输入框
  DATE_PICKER, // 时间选择器
  INPUT_NUMBER, // 输入框数字  普通输入框 但是需要value是number类型
}

export class MyFormStore {
  data: any = {};

  events: Look | undefined;

  constructor({ params, events }: { params: MyFormTypes[]; events: Look }) {
    const data = {};


    params?.forEach((v) => Object.assign(data, { [v.value]: undefined }));

    this.updateData({ data, events });

    makeAutoObservable(this);
  }

  // 提交表单触发的函数
  handleSubmit(data: any) {
    console.log("???");  
    
    this.events?.subscribe("submit", data)
  }

  updateData(params: Partial<MyFormStore>) {
    runInAction(() => {
      Object.assign(this, params);
    });
  }
}
