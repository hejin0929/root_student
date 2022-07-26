import { makeAutoObservable } from "mobx";
import { Routers } from "@store/auth/router";

class StudentStore {
  search: string | undefined;
  router: Routers;

  constructor({ routers }: { routers: Routers }) {
    this.router = routers;
    makeAutoObservable(this);
  }

  // 执行返回上一个页面
  handleBack() {
    this.router.navigate("/home/1");
  }

  // 点击文件/文件夹
  handleItems() {
    this.router.navigate("/study_details");
  }
}

export default StudentStore;
