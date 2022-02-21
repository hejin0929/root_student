import { makeAutoObservable } from "mobx";


class AdminStore {
    constructor() {
        makeAutoObservable(this)
    }
}

export default AdminStore