interface getCodeGetPhoneCode {
  code: string
}
interface getCodeResCode {
  body ? : getCodeGetPhoneCode;
  mgsCode: number;
  mgsText: string
}
interface loginUser {
  id: string;
  name: string;
  token: string
}
interface loginUserBody {
  body ? : loginUser;
  mgsCode: number;
  mgsText: string
}
interface loginUserCode {
  code: string;
  phone: string
}
interface loginUserName {
  password: string;
  phone: string
}
interface loginUserSignReps {
  body ? : string;
  mgsCode: number;
  mgsText: string
}
interface loginUserSignType {
  code: string;
  password: string;
  phone: string
}
interface uploadFilesFilesRes {
  body ? : string;
  mgsCode: number;
  mgsText: string
}

export interface Paths {
  "/api/login/user/login": {
    ParamsData ? : undefined;
    type: "post";
    reqData: loginUserName;
    resData: loginUserBody
  };
  "/api/login/user/login_code": {
    ParamsData ? : undefined;
    type: "post";
    reqData: loginUserCode;
    resData: loginUserBody
  };
  "/api/login/user/sign": {
    ParamsData ? : undefined;
    type: "post";
    reqData: loginUserSignType;
    resData: loginUserSignReps
  };
  "/api/phone_code/user/{phone}": {
    ParamsData ? : {
      phone: string
    };
    type: "get";
    reqData: undefined;
    resData: getCodeResCode
  };
  "/api/upload/images": {
    ParamsData ? : {
      image: File
    };
    type: "post";
    resData: uploadFilesFilesRes,
    reqData: getCodeResCode
  }
}