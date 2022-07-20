import { makeAutoObservable } from "mobx";

class StudentStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default StudentStore;
