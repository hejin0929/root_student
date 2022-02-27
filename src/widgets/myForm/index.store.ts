import { makeAutoObservable, runInAction } from "mobx";

export type MyFormTypes = {
  name: string;
  value: string;
  required?: boolean;
  infoText?: string;
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

  constructor({ params }: { params: MyFormTypes[] }) {
    makeAutoObservable(this);
  }

  updateData(params: Partial<MyFormStore>) {
    runInAction(() => {
      Object.assign(this, params);
    });
  }
}
