import { makeAutoObservable } from "mobx";

class UploadStore {

    constructor() {
        makeAutoObservable(this)
    }

    handleFileChange(event: React.MutableRefObject<HTMLInputElement>) {
        const data = event.current.files?.[0] as File;
        const reader = new FileReader()

        reader.readAsDataURL(data)

        reader.onload = function (e) {
            console.log("this is a ?? ", this.result);
            
        }

    }
}

export default UploadStore