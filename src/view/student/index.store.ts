import { makeAutoObservable } from "mobx";

class StudentStore {
  search: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  // 执行返回上一个页面
  handleBack() {}
}

export default StudentStore;
